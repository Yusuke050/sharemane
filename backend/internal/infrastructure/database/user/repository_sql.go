package user

import (
	"context"
	"time"

	"github.com/Yusuke050/sharemane/backend/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{db: db}
}

func (r *Repository) List(ctx context.Context) ([]*domain.User, error) {
	rows, err := r.db.Query(ctx, "SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var list []*domain.User
	for rows.Next() {
		var ID int
		var Name string
		var CreatedAt time.Time
		if err := rows.Scan(&ID, &Name, &CreatedAt); err != nil {
			return nil, err
		}
		list = append(list, &domain.User{
			ID:        ID,
			Name:      Name,
			CreatedAt: CreatedAt,
		})

	}
	return list, nil
}

func (r *Repository) FindByID(ctx context.Context, id int) (*domain.User, error) {
	var ID int
	var Name string
	var CreatedAt time.Time
	err := r.db.QueryRow(ctx, "SELECT id, name, created_at FROM users WHERE id = $1", id).
		Scan(&ID, &Name, &CreatedAt)
	if err != nil {
		return nil, err
	}

	return &domain.User{
		ID:        ID,
		Name:      Name,
		CreatedAt: CreatedAt,
	}, err
}
