package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Yusuke050/sharemane/backend/internal/usecase"
	"github.com/go-chi/chi/v5"
)

type UserHandler struct {
	svc *usecase.UserService
}

func NewUserHandler(svc *usecase.UserService) *UserHandler {
	return &UserHandler{svc: svc}
}

func (h *UserHandler) ListUsers(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	users, err := h.svc.ListUsers(ctx)
	if err != nil {
		http.Error(w, "faild to fetch users", http.StatusInternalServerError)
		return
	}
	res := make([]UserResponse, 0, len(users))
	for _, u := range users {
		res = append(res, UserResponse{
			ID:        u.ID,
			Name:      u.Name,
			CreatedAt: u.CreatedAt,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(res)
}

func (h *UserHandler) FindByID(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid id", 400)
		return
	}

	user, err := h.svc.FindById(ctx, id)
	if err != nil {
		http.Error(w, "faild to fetch user", http.StatusInternalServerError)
		return
	}
	res := UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		CreatedAt: user.CreatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(res)
}
