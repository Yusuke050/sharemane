package domain

import (
	"context"
	"time"
)

type User struct {
	ID        int
	Name      string
	CreatedAt time.Time
}

type UserRepository interface {
	List(ctx context.Context) ([]*User, error)
	FindByID(ctx context.Context, id int) (*User, error)
}
