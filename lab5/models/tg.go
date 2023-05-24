package models

type User struct {
	ID        int64  `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type Update struct {
	ID      int     `json:"update_id"`
	Message Message `json:"message"`
}

type Message struct {
	ID   int    `json:"message_id"`
	From User   `json:"from"`
	Chat Chat   `json:"chat"`
	Text string `json:"text"`
}

type Chat struct {
	ID       int    `json:"id"`
	Type     string `json:"type"`
	Title    string `json:"title"`
	Username string `json:"username"`
}
