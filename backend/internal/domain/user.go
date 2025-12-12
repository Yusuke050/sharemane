package domain

import (
	"context"
	"fmt"
	netmail "net/mail"
	"strings"
	"time"
)

type User struct {
	ID        int
	Name      string
	Mail      string
	CreatedAt time.Time
}

func NewUser(name string, email string) (*User, error) {
	name = strings.TrimSpace(name)
	email = strings.TrimSpace(strings.ToLower(email))

	if name == "" {
		return nil, fmt.Errorf("name is required")
	}
	if email == "" {
		return nil, fmt.Errorf("email is required")
	}
	if _, err := netmail.ParseAddress(email); err != nil {
		return nil, fmt.Errorf("invalid email")
	}
	return &User{
		Name: name,
		Mail: email,
	}, nil
}

type UserRepository interface {
	List(ctx context.Context) ([]*User, error)
	FindByID(ctx context.Context, id int) (*User, error)
}
