package http

import "github.com/Yusuke050/sharemane/backend/internal/usecase"

type PaymentHandler struct {
	svc *usecase.PaymentService
}

func NewPaymentHandler(svc *usecase.PaymentService) *PaymentHandler {
	return &PaymentHandler{svc: svc}
}

// POST /payment

// GET /payment/summary

// DELETE /payment/{id}
