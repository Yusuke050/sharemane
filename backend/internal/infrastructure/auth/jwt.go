package auth

import (
	"errors"
	"time"

	"github.com/Yusuke050/sharemane/backend/internal/domain"
	"github.com/golang-jwt/jwt/v5"
)

type JWT struct {
	SecretKey string
	TTL       time.Duration
}

func NewJWT(secretKey string, ttl time.Duration) *JWT {
	return &JWT{
		SecretKey: secretKey,
		TTL:       ttl,
	}
}

func (j *JWT) GenerateToken(user *domain.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(j.TTL).Unix(),
	})
	return token.SignedString([]byte(j.SecretKey))
}

func (j *JWT) VerifyToken(token string) (bool, error) {
	claims, err := jwt.ParseWithClaims(token, &jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.SecretKey), nil
	})
	if err != nil {
		return false, err
	}
	if time.Unix(claims.Claims.(jwt.MapClaims)["exp"].(int64), 0).Before(time.Now()) {
		return false, errors.New("token expired")
	}
	return true, nil
}
