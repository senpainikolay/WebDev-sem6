package main

import (
	"context"
	"log"
	"os"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func InsertIntoDb(userId int, link string, chatId int) {

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://" + os.Getenv("DB_USR") + ":" + os.Getenv("DB_PW") + "@cluster0.hhs44zj.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 3*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("LinksPerUser")
	col := db.Collection("links")

	_, err = col.InsertOne(ctx, bson.D{
		{"UserID", strconv.Itoa(userId)},
		{"Link", link},
	})
	if err != nil {
		log.Println("There was an errr in trying to migrate the data into the database")
	}
	go sendToBot("Succesful saved the link to the db!", chatId)
}

func GetLinksPerUserId(userId int, chatId int) {

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://" + os.Getenv("DB_USR") + ":" + os.Getenv("DB_PW") + "@cluster0.hhs44zj.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 2*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("LinksPerUser")
	col := db.Collection("links")

	filterCol, err := col.Find(ctx, bson.M{"UserID": strconv.Itoa(userId)})
	if err != nil {
		log.Fatal(err)
	}
	var linksFiltered []bson.M
	if err = filterCol.All(ctx, &linksFiltered); err != nil {
		log.Fatal(err)
	}

	if len(linksFiltered) > 0 {
		for i := 0; i < len(linksFiltered); i++ {
			idx := i
			txt := linksFiltered[idx]["Link"].(string)
			go sendToBot(txt, chatId)
		}
	} else {
		go sendToBot("No links saved!", chatId)
	}
}
