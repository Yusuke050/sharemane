package usecase

import (
	"context"
	"fmt"

	"github.com/Yusuke050/sharemane/backend/internal/domain"
)

type AuthService struct {
	repo           domain.UserRepository
	tokenGenerator domain.TokenGenerator
}

func NewAuthService(repo domain.UserRepository, tokenGenerator domain.TokenGenerator) *AuthService {
	return &AuthService{repo, tokenGenerator}
}

func (s *AuthService) Login(ctx context.Context, email string, password string) (string, error) {
	user, err := s.repo.FindByEmail(ctx, email)
	if err != nil {
		return "", err
	}
	if !user.ComparePassword(password) {
		return "", fmt.Errorf("invalid password")
	}
	token, err := s.tokenGenerator.GenerateToken(user)
	if err != nil {
		return "", err
	}
	return token, nil
}
