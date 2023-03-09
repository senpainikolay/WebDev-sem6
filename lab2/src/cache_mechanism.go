package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type CacheUnit struct {
	Link   string `json:"link"`
	Result string `json:"result"`
}

type CacheMap struct {
	Links []CacheUnit `json:"links"`
}

func initCacheMap() map[string]string {
	file, err := os.Open("cache/cache.json")
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	defer file.Close()

	jsonData, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	var linksFromJson CacheMap
	err = json.Unmarshal(jsonData, &linksFromJson)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	m := make(map[string]string)

	for i := 0; i < len(linksFromJson.Links); i++ {
		m[linksFromJson.Links[i].Link] = linksFromJson.Links[i].Result
	}

	return m
}

func saveJson(m map[string]string) {
	var cacheMap CacheMap
	for key, val := range m {
		cacheMap.Links = append(cacheMap.Links, CacheUnit{Link: key, Result: val})
	}

	jsonData, err := json.Marshal(cacheMap)
	if err != nil {
		panic(err)
	}
	err = ioutil.WriteFile("cache/cache.json", jsonData, 0644)
	if err != nil {
		panic(err)
	}
}
