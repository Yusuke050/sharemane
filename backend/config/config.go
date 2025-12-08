package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	DB struct {
		Host     string
		Port     int
		User     string
		Password string
		Name     string
		SSLMode  string
	}
	Server struct {
		Port int
	}
}

func Load() (*Config, error) {
	godotenv.Load()

	cfg := &Config{}

	cfg.DB.Host = os.Getenv("DB_HOST")
	cfg.DB.Port, _ = strconv.Atoi(os.Getenv("DB_PORT"))
	cfg.DB.User = os.Getenv("DB_USER")
	cfg.DB.Password = os.Getenv("DB_PASSWORD")
	cfg.DB.Name = os.Getenv("DB_NAME")
	cfg.DB.SSLMode = os.Getenv("DB_SSLMODE")

	cfg.Server.Port, _ = strconv.Atoi(os.Getenv("SERVER_PORT"))

	return cfg, nil
}
