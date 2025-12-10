package usecase

import (
	"context"

	"github.com/Yusuke050/sharemane/backend/internal/domain"
)

type UserService struct {
	repo domain.UserRepository
}

func NewService(repo domain.UserRepository) *UserService {
	return &UserService{repo}
}

func (s *UserService) ListUsers(ctx context.Context) ([]*domain.User, error) {
	users, err := s.repo.List(ctx)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (s *UserService) FindById(ctx context.Context, id int) (*domain.User, error) {
	user, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return user, nil
}
