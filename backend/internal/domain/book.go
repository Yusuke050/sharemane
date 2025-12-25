package domain

import (
	"context"
	"fmt"
	"time"
)

// Book is an aggregate root representing one shared ledger.
// It owns membership and (later) payments within the book.
type Book struct {
	ID      int
	Name    string
	Members []int // user IDs
}

func NewBook(name string, memberIDs []int) (*Book, error) {
	if name == "" {
		return nil, fmt.Errorf("book name is required")
	}
	uniq := make([]int, 0, len(memberIDs))
	seen := map[int]struct{}{}
	for _, id := range memberIDs {
		if id <= 0 {
			return nil, fmt.Errorf("member id must be positive")
		}
		if _, ok := seen[id]; ok {
			continue
		}
		seen[id] = struct{}{}
		uniq = append(uniq, id)
	}
	return &Book{
		Name:    name,
		Members: uniq,
	}, nil
}

func (b *Book) HasMember(userID int) bool {
	for _, id := range b.Members {
		if id == userID {
			return true
		}
	}
	return false
}

func (b *Book) AddMember(userID int) error {
	if userID <= 0 {
		return fmt.Errorf("member id must be positive")
	}
	if b.HasMember(userID) {
		return nil
	}
	b.Members = append(b.Members, userID)
	return nil
}

func (b *Book) RemoveMember(userID int) {
	next := b.Members[:0]
	for _, id := range b.Members {
		if id != userID {
			next = append(next, id)
		}
	}
	b.Members = next
}

// CreatePayment validates Book-context invariants and returns a new Payment entity.
// It does not persist anything; usecases should save via repositories.
func (b *Book) CreatePayment(categoryID, paidBy, amount int, description string, date time.Time) (*Payment, error) {
	if !b.HasMember(paidBy) {
		return nil, fmt.Errorf("paidBy must be a member of the book")
	}
	return NewPayment(b.ID, categoryID, paidBy, amount, description, date)
}

// ValidatePayment checks Book-context invariants for an existing Payment.
// Useful when rehydrating or importing payments.
func (b *Book) ValidatePayment(p *Payment) error {
	if p == nil {
		return fmt.Errorf("payment is required")
	}
	if p.BookID != b.ID {
		return fmt.Errorf("payment must belong to this book")
	}
	if !b.HasMember(p.PaidBy) {
		return fmt.Errorf("paidBy must be a member of the book")
	}
	return nil
}

// BookRepository is a port for persisting Book aggregates.
type BookRepository interface {
	Get(ctx context.Context, id int) (*Book, error)
	Save(ctx context.Context, book *Book) error
	Create(ctx context.Context, book *Book) error
}
