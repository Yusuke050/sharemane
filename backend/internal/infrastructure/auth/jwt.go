package auth

import (
	"errors"
	"fmt"
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

func (j *JWT) VerifyToken(tokenString string) (int, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(j.SecretKey), nil
	})

	if err != nil {
		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, errors.New("invalid token")
	}

	exp, ok := claims["exp"].(float64)
	if !ok || time.Now().Unix() > int64(exp) {
		return 0, errors.New("token expired")
	}

	userID, ok := claims["sub"].(float64)
	if !ok {
		return 0, errors.New("invalid token: missing user ID")
	}

	return int(userID), nil
}
