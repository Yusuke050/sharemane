package domain

import (
	"context"
	"fmt"
	"time"
)

// Payment is an entity that belongs to a Book aggregate.
// Business rules that depend on Book (e.g., paidBy must be a member)
// should be enforced by Book methods, not here.
type Payment struct {
	ID          int
	BookID      int
	CategoryID  int
	Amount      int
	Description string
	PaidBy      int
	Date        time.Time // date-only semantics
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

func NewPayment(bookID, categoryID, paidBy, amount int, description string, date time.Time) (*Payment, error) {
	if bookID <= 0 || categoryID <= 0 || paidBy <= 0 {
		return nil, fmt.Errorf("ids must be positive")
	}
	if amount <= 0 {
		return nil, fmt.Errorf("amount must be positive")
	}
	if date.IsZero() {
		return nil, fmt.Errorf("date is required")
	}
	if len(description) > 1000 {
		return nil, fmt.Errorf("description too long")
	}

	// normalize to midnight for date-only usage
	y, m, d := date.Date()
	date = time.Date(y, m, d, 0, 0, 0, 0, date.Location())

	return &Payment{
		BookID:      bookID,
		CategoryID:  categoryID,
		Amount:      amount,
		Description: description,
		PaidBy:      paidBy,
		Date:        date,
	}, nil
}

// PaymentRepository is a port for persisting payments within a book.
type PaymentRepository interface {
	ListByBook(ctx context.Context, bookID int) ([]*Payment, error)
	Create(ctx context.Context, p *Payment) (*Payment, error)
	Delete(ctx context.Context, id int, bookID int) error
}

