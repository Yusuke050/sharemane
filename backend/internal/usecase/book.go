package usecase

import (
	"context"

	"github.com/Yusuke050/sharemane/backend/internal/domain"
)

type BookService struct {
	repo domain.BookRepository
}

func NewBookService(repo domain.BookRepository) *BookService {
	return &BookService{repo}
}

func (s *BookService) CreateBook(ctx context.Context, name string, memberIDs []int) (*domain.Book, error) {
	book, err := domain.NewBook(name, memberIDs)
	if err != nil {
		return nil, err
	}
	err = s.repo.Create(ctx, book)
	if err != nil {
		return nil, err
	}
	return book, nil
}
