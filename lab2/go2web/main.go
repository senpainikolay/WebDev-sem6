package main

import (
	"bufio"
	"crypto/tls"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"net/url"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"golang.org/x/net/html"
)

var m = initCacheMap()

func main() {
	urlFlag := flag.String("u", "", "Make a HTTPS request to an URL! The :443 port should be available to make the TLS connection :) ")
	searchFlag := flag.String("s", "", "Search a string upon google engine!!!")
	helpFlag := flag.Bool("h", false, "Show help")

	flag.Parse()
	if *helpFlag {
		flag.Usage()
		return
	}

	if *urlFlag != "" {
		parseUrl(*urlFlag, false)
	}

	if *searchFlag != "" {
		searchURL := "https://www.google.com/search?q=" + url.QueryEscape(*searchFlag)
		parseUrl(searchURL, true)
	}
}

// Recursive in case of a redirect.
func parseUrl(urlFlag string, methodFlag bool) {
	value, ok := m[urlFlag]
	if ok {
		fmt.Println(value)
		return
	}
	// Parse URL
	url, err := url.Parse(urlFlag)
	if err != nil {
		panic(err.Error())
	}
	conn, err := net.Dial("tcp", url.Hostname()+":443")
	if err != nil {
		panic(err)
	}
	tlsConfig := &tls.Config{
		MinVersion:         tls.VersionTLS12,
		InsecureSkipVerify: true,
	}

	tlsConn := tls.Client(conn, tlsConfig)

	if methodFlag {
		fmt.Fprintf(tlsConn, "GET /search?"+url.RawQuery+" HTTP/1.0\r\nHost: "+url.Hostname()+"\r\n\r\n")
	} else {
		fmt.Fprintf(tlsConn, "GET /"+url.RawQuery+" HTTP/1.0\r\nHost: "+url.Hostname()+"\r\n\r\n")

	}

	reader := bufio.NewReader(tlsConn)
	bodyStr := ""
	for {
		response, err := reader.ReadString('\n')
		if err == io.EOF {
			bodyStr = bodyStr + response
			break
		}
		if err != nil {
			panic(err)
		}
		if strings.HasPrefix(response, "<!doctype html>") {
			if methodFlag {
				// starting reading the actualy HTML Body
				bodyStr = ""
			}
			continue
		}

		// Redirect Implementation : the IF state : closes the connection and recursively call the function with the new Link.
		if strings.HasPrefix(response, "HTTP/1.1 3") || strings.HasPrefix(response, "HTTP/1.0 3") {
			locationHeader := ""
			for {
				line, err := reader.ReadString('\n')
				if err != nil {
					panic(err)
				}
				if strings.HasPrefix(line, "Location:") {
					locationHeader = strings.TrimSpace(strings.TrimPrefix(line, "Location:"))
					break
				}
				if line == "\r\n" {
					break
				}

			}
			if locationHeader == "" {
				panic("Redirect response without Location header")
			}
			conn.Close()
			parseUrl(locationHeader, methodFlag)
			return
		}
		// HTML body
		bodyStr = bodyStr + response
	}

	conn.Close()
	if methodFlag {
		parseLinks(bodyStr, urlFlag)
	} else {
		htmlParserForTokenizer(bodyStr, urlFlag)
	}

}

// Since the go query lib is a concurrent one, I had to implement the struct with a mutex to
type SafeParser struct {
	mu         sync.Mutex
	c          int
	fnStr      string
	numOfLinks int
}

func parseLinks(bodyStr string, urlFlag string) {
	reader := strings.NewReader(bodyStr)
	safeRes := SafeParser{c: 0, fnStr: "", numOfLinks: 10}

	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		panic(err)
	}

	doc.Find("a").Each(func(i int, s *goquery.Selection) {
		link, exists := s.Attr("href")
		if exists {
			title := s.Children()

			if title != nil && link[:4] == "/url" && title.Text() != "" {
				safeRes.mu.Lock()
				safeRes.c += 1
				safeRes.fnStr += fmt.Sprintf("%v. %s\nLink: %s\n\n", safeRes.c, title.Text(), link[7:]) + "\n"
				if safeRes.c == safeRes.numOfLinks {
					fmt.Println(safeRes.fnStr)
					m[urlFlag] = safeRes.fnStr
					upateJsonCacheWithTheCurrentMap(m)
					safeRes.mu.Unlock()
					return
				}
				safeRes.mu.Unlock()

			}

		}
	})

}

type SafePageParser struct {
	mu    sync.Mutex
	fnStr string
}

func htmlParserForTokenizer(bodyStr string, urlFlag string) {
	reader := strings.NewReader(bodyStr)
	tokenizer := html.NewTokenizer(reader)
	safeRes := SafePageParser{fnStr: ""}
	for {
		tokenType := tokenizer.Next()
		if tokenType == html.ErrorToken {
			err := tokenizer.Err()
			panic(err)
		}
		if tokenType == html.TextToken {
			fmt.Printf("\n\n>>>>> Response Headers:\n\n" + string(tokenizer.Text()))
			break
		}

	}

	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(">>>>> Paragraphs: \n ")
	// P attributes parsing
	doc.Find("p").Each(func(i int, s *goquery.Selection) {
		if s.Text() != " " && s.Text() != "" {
			safeRes.mu.Lock()
			safeRes.fnStr += fmt.Sprintf(">> %s \n", s.Text())
			safeRes.mu.Unlock()
		}
	})
	safeRes.mu.Lock()
	fmt.Println(safeRes.fnStr)
	m[urlFlag] = safeRes.fnStr
	upateJsonCacheWithTheCurrentMap(m)
	safeRes.mu.Unlock()

}
