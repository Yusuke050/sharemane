package domain

import (
	"context"
	"fmt"
	netmail "net/mail"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int
	Name      string
	Mail      string
	Password  string
	CreatedAt time.Time
}

func NewUser(name string, email string, password string) (*User, error) {
	name = strings.TrimSpace(name)
	email = strings.TrimSpace(strings.ToLower(email))
	password = strings.TrimSpace(password)
	if name == "" {
		return nil, fmt.Errorf("name is required")
	}
	if email == "" {
		return nil, fmt.Errorf("email is required")
	}
	if _, err := netmail.ParseAddress(email); err != nil {
		return nil, fmt.Errorf("invalid email")
	}
	if password == "" {
		return nil, fmt.Errorf("password is required")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}
	return &User{
		Name:     name,
		Mail:     email,
		Password: string(hashedPassword),
	}, nil
}
func (u *User) ComparePassword(password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)) == nil
}

type UserRepository interface {
	Create(ctx context.Context, user *User) error
	List(ctx context.Context) ([]*User, error)
	FindByID(ctx context.Context, id int) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
}
