package models

type ResponseNYTAPI struct {
	Response Response `json:"response"`
}

type Response struct {
	Docs []Article `json:"docs"`
}

type Article struct {
	Abstract string `json:"abstract"`
	WebURL   string `json:"web_url"`
}
