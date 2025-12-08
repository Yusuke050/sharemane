package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Yusuke050/sharemane/backend/config"
	"github.com/Yusuke050/sharemane/backend/database"
)

type helloHandler struct{}

func (hh *helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	fmt.Fprintf(w, "Hello!,%q¥n", name)
}

func initRoute() *http.ServeMux {
	mux := http.NewServeMux()
	h := &helloHandler{}
	mux.HandleFunc("GET /hello", h.ServeHTTP)
	return mux
}

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	db, err := database.NewDB(cfg)
	if err != nil {
		log.Fatalf("Failed to load db: %v", err)
	}
	defer db.Close()
	fmt.Println("Database connected successfully!")
	// テストクエリ: usersテーブルから全ユーザーを取得
	rows, err := db.Query("SELECT id, name, created_at FROM users ORDER BY id")
	if err != nil {
		log.Fatalf("Failed to query users: %v", err)
	}
	defer rows.Close()
	fmt.Println("\n=== Users ===")
	for rows.Next() {
		var id int
		var name string
		var createdAt string
		if err := rows.Scan(&id, &name, &createdAt); err != nil {
			log.Printf("Failed to scan row: %v", err)
			continue
		}
		fmt.Printf("ID: %d, Name: %s, Created: %s\n", id, name, createdAt)
	}
	if err := rows.Err(); err != nil {
		log.Fatalf("Error iterating rows: %v", err)
	}

	mux := initRoute()
	fmt.Println("Server Start Up........")
	log.Fatal(http.ListenAndServe(":8080", mux))

}
