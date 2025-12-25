package usecase

import (
	"context"
	"fmt"

	"github.com/Yusuke050/sharemane/backend/internal/domain"
)

type AuthService struct {
	repo domain.UserRepository
}

func NewAuthService(repo domain.UserRepository) *AuthService {
	return &AuthService{repo}
}

func (s *AuthService) Login(ctx context.Context, email string, password string) (*domain.User, error) {
	user, err := s.repo.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if !user.ComparePassword(password) {
		return nil, fmt.Errorf("invalid password")
	}
	return user, nil
}

func (s *AuthService) Logout(ctx context.Context, token string) error {
	return nil
}

func (s *AuthService) RefreshToken(ctx context.Context, token string) (string, error) {
	return "", nil
}
