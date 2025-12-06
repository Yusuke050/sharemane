# Payment API 仕様書

## 概要

共同家計簿アプリの支払い管理機能を提供するREST APIです。

## ベースURL

```
http://localhost:8080/api
```

## エンドポイント一覧

### 1. 支払いサマリー取得

支払い状況と履歴を取得します。

**エンドポイント:** `GET /payment/summary`

**レスポンス**

- **ステータスコード:** `200 OK`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "members": [
    {
      "userId": 1,
      "userName": "みなみ",
      "totalPaid": 251003,
      "balance": 124752
    },
    {
      "userId": 2,
      "userName": "ゆうすけ",
      "totalPaid": 1500,
      "balance": -124751
    }
  ],
  "totalExpense": 252503,
  "perPerson": 126252,
  "history": [
    {
      "id": 1,
      "category": "交際費",
      "amount": 500,
      "description": "500",
      "paidBy": "みなみ",
      "date": "12/1"
    }
  ]
}
```

**フィールド説明:**

- `members`: メンバーごとの支払い状況
  - `userId`: ユーザーID（整数）
  - `userName`: ユーザー名（文字列）
  - `totalPaid`: 総支払額（整数、単位: 円）
  - `balance`: 収支バランス（整数、単位: 円。プラスは受け取るべき金額、マイナスは支払うべき金額）
- `totalExpense`: 合計支出額（整数、単位: 円）
- `perPerson`: 一人あたりの金額（整数、単位: 円）
- `history`: 支払い履歴の配列
  - `id`: 支払いID（整数）
  - `category`: カテゴリ（文字列）
  - `amount`: 金額（整数、単位: 円）
  - `description`: 説明（文字列、空文字列可）
  - `paidBy`: 支払った人の名前（文字列）
  - `date`: 日付（文字列、形式: "MM/DD"）

**ビジネスロジック:**

1. `totalExpense`: すべての支払い履歴の`amount`の合計
2. `perPerson`: `totalExpense / メンバー数`（端数処理は切り捨て）
3. `totalPaid`: 各メンバーが支払った金額の合計（`paidBy`がそのメンバーの名前の履歴の`amount`の合計）
4. `balance`: `totalPaid - perPerson`

**エラーレスポンス:**

- `500 Internal Server Error`: サーバーエラー

```json
{
  "error": "Internal server error",
  "message": "詳細なエラーメッセージ"
}
```

---

### 2. 支払い作成

新しい支払いを追加します。

**エンドポイント:** `POST /payment`

**リクエストヘッダー:**

```
Content-Type: application/json
```

**リクエストボディ:**

```json
{
  "category": "食費",
  "amount": 5000,
  "description": "スーパーで買い物",
  "paidBy": "みなみ",
  "date": "12/2"
}
```

**フィールド説明:**

- `category`: カテゴリ（文字列、必須、1文字以上）
- `amount`: 金額（整数、必須、1以上）
- `description`: 説明（文字列、オプション、空文字列可）
- `paidBy`: 支払った人の名前（文字列、必須、1文字以上）
- `date`: 日付（文字列、必須、形式: "MM/DD"）

**レスポンス**

- **ステータスコード:** `201 Created`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "id": 7,
  "category": "食費",
  "amount": 5000,
  "description": "スーパーで買い物",
  "paidBy": "みなみ",
  "date": "12/2"
}
```

**エラーレスポンス:**

- `400 Bad Request`: バリデーションエラー

```json
{
  "error": "Validation error",
  "message": "フィールド名: エラーメッセージ"
}
```

- `500 Internal Server Error`: サーバーエラー

```json
{
  "error": "Internal server error",
  "message": "詳細なエラーメッセージ"
}
```

---

### 3. 支払い削除

指定したIDの支払いを削除します。

**エンドポイント:** `DELETE /payment/{id}`

**パスパラメータ:**

- `id`: 支払いID（整数、必須）

**レスポンス**

- **ステータスコード:** `204 No Content`
- **レスポンスボディ:** なし

**エラーレスポンス:**

- `404 Not Found`: 指定したIDの支払いが存在しない

```json
{
  "error": "Not found",
  "message": "Payment with id {id} not found"
}
```

- `500 Internal Server Error`: サーバーエラー

```json
{
  "error": "Internal server error",
  "message": "詳細なエラーメッセージ"
}
```

---

## データモデル

### Payment（支払い）

```go
type Payment struct {
    ID          int    `json:"id" db:"id"`
    Category    string `json:"category" db:"category"`
    Amount      int    `json:"amount" db:"amount"`
    Description string `json:"description" db:"description"`
    PaidBy      string `json:"paidBy" db:"paid_by"`
    Date        string `json:"date" db:"date"`
    CreatedAt   time.Time `json:"createdAt" db:"created_at"`
    UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
}
```

### User（ユーザー）

```go
type User struct {
    ID   int    `json:"userId" db:"id"`
    Name string `json:"userName" db:"name"`
}
```

### PaymentSummary（支払いサマリー）

```go
type PaymentSummary struct {
    Members     []PaymentStatus `json:"members"`
    TotalExpense int            `json:"totalExpense"`
    PerPerson    int            `json:"perPerson"`
    History      []Payment      `json:"history"`
}

type PaymentStatus struct {
    UserID    int    `json:"userId"`
    UserName  string `json:"userName"`
    TotalPaid int    `json:"totalPaid"`
    Balance   int    `json:"balance"`
}
```

---

## データベーススキーマ

### payments テーブル

```sql
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    description TEXT DEFAULT '',
    paid_by VARCHAR(255) NOT NULL,
    date VARCHAR(10) NOT NULL, -- 形式: "MM/DD"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_date ON payments(date);
CREATE INDEX idx_payments_paid_by ON payments(paid_by);
```

### users テーブル

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 実装の注意点

1. **日付形式**: `date`フィールドは文字列形式（"MM/DD"）で保存・返却します
2. **金額計算**: すべての金額は整数（単位: 円）で扱います
3. **バリデーション**: 
   - `amount`は1以上の整数である必要があります
   - `category`と`paidBy`は空文字列不可です
   - `date`は"MM/DD"形式である必要があります
4. **トランザクション**: 支払いの作成・削除時は、データの整合性を保つためトランザクションを使用してください
5. **エラーハンドリング**: 適切なHTTPステータスコードとエラーメッセージを返してください

---

## 実装例（Go）

### エンドポイント実装の基本構造

```go
// GET /api/payment/summary
func GetPaymentSummary(c *gin.Context) {
    // 1. すべての支払い履歴を取得
    // 2. すべてのユーザーを取得
    // 3. 各ユーザーのtotalPaidを計算
    // 4. totalExpenseとperPersonを計算
    // 5. 各ユーザーのbalanceを計算
    // 6. レスポンスを返す
}

// POST /api/payment
func CreatePayment(c *gin.Context) {
    // 1. リクエストボディをパース
    // 2. バリデーション
    // 3. データベースに保存
    // 4. 保存したデータを返す
}

// DELETE /api/payment/{id}
func DeletePayment(c *gin.Context) {
    // 1. パスパラメータからIDを取得
    // 2. データベースから削除
    // 3. 204 No Contentを返す
}
```

---

## テストケース

### 1. 支払いサマリー取得

- 正常系: 支払いデータが存在する場合、正しいサマリーを返す
- 正常系: 支払いデータが存在しない場合、空の配列と0を返す

### 2. 支払い作成

- 正常系: すべての必須フィールドが正しく入力されている場合、作成成功
- 異常系: `amount`が0以下の場合、400エラー
- 異常系: `category`が空文字列の場合、400エラー
- 異常系: `paidBy`が空文字列の場合、400エラー
- 異常系: `date`が不正な形式の場合、400エラー

### 3. 支払い削除

- 正常系: 存在するIDを指定した場合、削除成功
- 異常系: 存在しないIDを指定した場合、404エラー

