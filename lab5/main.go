package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	mdls "github.com/senpainikolay/WebDev-sem6/lab5/models"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	http.HandleFunc("/lol", handleUpdate)

	fmt.Println("Listenning on port", os.Getenv("PORT"), ".")
	if err := http.ListenAndServe(":"+os.Getenv("PORT"), nil); err != nil {
		log.Fatal(err)
	}
}

func handleUpdate(w http.ResponseWriter, r *http.Request) {

	message := mdls.Update{}
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		fmt.Println(err)
	}
	whichCmd(message.Message)
}

func sendToBot(text string, chatID int) {
	respMsg := fmt.Sprintf("%s/sendMessage?chat_id=%d&text=%s", os.Getenv("BOT_API")+os.Getenv("TG_TOKEN"), chatID, text)
	_, err := http.Get(respMsg)
	if err != nil {
		fmt.Println(err)
	}

}

func whichCmd(msg mdls.Message) {
	stringArr := strings.Split(msg.Text, " ")

	switch cmd := stringArr[0]; cmd {
	case "/start":
		txt := fmt.Sprintf("Hello there %s :))))", msg.From.FirstName)
		go sendToBot(txt, msg.Chat.ID)
	case "a":
		if len(stringArr) > 1 {
			fetchNews(stringArr[1], msg.Chat.ID)
		} else {
			fetchNews("", msg.Chat.ID)
		}
	// case "/save_news":
	// 	return "save news lol"
	// case "/saved_news":
	// 	return "keekk lol"
	default:
		go sendToBot("Invalid command!", msg.Chat.ID)
	}
}

func fetchNews(topic string, chatID int) {
	var url string
	if topic != "" {
		url = fmt.Sprintf("%s?q=%s&api-key=%s", os.Getenv("NYT_API"), topic, os.Getenv("NYT_API_KEY"))
	} else {
		url = fmt.Sprintf("%s?api-key=%s", os.Getenv("NYT_API"), os.Getenv("NYT_API_KEY"))
	}

	var result mdls.ResponseNYTAPI

	res, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	err = json.Unmarshal(body, &result)
	if err != nil {
		fmt.Println(err)
	}

	sendToBot("The latest news are: %0A", chatID)

	for i := 0; i < 5; i++ {
		str := result.Response.Docs[i].Abstract + "%0A%0A Link: " + result.Response.Docs[i].WebURL
		sendToBot(str, chatID)
	}
}
