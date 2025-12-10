package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"

	// "github.com/go-chi/chi/v5/middleware"

	"github.com/Yusuke050/sharemane/backend/config"
	"github.com/Yusuke050/sharemane/backend/internal/infrastructure/database"
	"github.com/Yusuke050/sharemane/backend/internal/infrastructure/database/user"
	userhttp "github.com/Yusuke050/sharemane/backend/internal/interface/http"
	"github.com/Yusuke050/sharemane/backend/internal/usecase"
)

func main() {
	// setting config
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}
	// setting db
	db, err := database.NewDB(cfg)
	if err != nil {
		log.Fatalf("Failed to load db: %v", err)
	}
	defer db.Close()
	fmt.Println("Database connected successfully!")

	userRepo := user.NewRepository(db.Pool)
	userService := usecase.NewService(userRepo)
	userHandler := userhttp.NewUserHandler(userService)

	//setting server
	r := chi.NewRouter()
	r.Route("/users", func(r chi.Router) {
		r.Get("/list", userHandler.ListUsers)
		r.Get("/{id}", userHandler.FindByID)
	})

	fmt.Println("Server Start Up........")
	log.Fatal(http.ListenAndServe(":8080", r))

}
