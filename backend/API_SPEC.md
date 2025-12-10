# API 仕様書

## 概要

共同家計簿アプリの REST API 仕様です。

## 共通仕様

### エラーレスポンス形式

すべてのエラーレスポンスは以下の形式で返されます：

```json
{
  "error": "エラータイプ",
  "message": "詳細なエラーメッセージ"
}
```

### HTTP ステータスコード

- `200 OK`: リクエスト成功
- `201 Created`: リソース作成成功
- `204 No Content`: リソース削除成功
- `400 Bad Request`: バリデーションエラー
- `404 Not Found`: リソースが見つからない
- `500 Internal Server Error`: サーバーエラー

## ベース URL

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
      "userName": "太郎",
      "totalPaid": 251003,
      "balance": 124752
    },
    {
      "userId": 2,
      "userName": "花子",
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
      "paidBy": "太郎",
      "date": "12/1"
    }
  ]
}
```

**フィールド説明:**

- `members`: メンバーごとの支払い状況
  - `userId`: ユーザー ID（整数）
  - `userName`: ユーザー名（文字列）
  - `totalPaid`: 総支払額（整数、単位: 円）
  - `balance`: 収支バランス（整数、単位: 円。プラスは受け取るべき金額、マイナスは支払うべき金額）
- `totalExpense`: 合計支出額（整数、単位: 円）
- `perPerson`: 一人あたりの金額（整数、単位: 円）
- `history`: 支払い履歴の配列
  - `id`: 支払い ID（整数）
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
  "paidBy": "太郎",
  "amount": 5000,
  "category": "食費",
  "description": "スーパーで買い物",
  "date": "2024-12-02"
}
```

**フィールド説明:**

- `paidBy`: 支払った人の名前（文字列、必須、1 文字以上）
- `amount`: 金額（整数、必須、1 以上）
- `category`: カテゴリ（文字列、必須、1 文字以上）
- `description`: 説明（文字列、オプション、空文字列可）
- `date`: 日付（文字列、必須、形式: "YYYY-MM-DD"）

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
  "paidBy": "太郎",
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

指定した ID の支払いを削除します。

**エンドポイント:** `DELETE /payment/{id}`

**パスパラメータ:**

- `id`: 支払い ID（整数、必須）

**レスポンス**

- **ステータスコード:** `204 No Content`
- **レスポンスボディ:** なし

**エラーレスポンス:**

- `404 Not Found`: 指定した ID の支払いが存在しない

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

## 2. メンバー管理

### 2.1 メンバー一覧取得

登録されているメンバー一覧を取得します。

**エンドポイント:** `GET /members`

**レスポンス**

- **ステータスコード:** `200 OK`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "members": [
    {
      "id": 1,
      "name": "太郎"
    },
    {
      "id": 2,
      "name": "花子"
    }
  ]
}
```

**フィールド説明:**

- `members`: メンバー一覧の配列
  - `id`: メンバー ID（整数）
  - `name`: メンバー名（文字列）

**エラーレスポンス:**

- `500 Internal Server Error`: サーバーエラー

---

### 2.2 メンバー追加

新しいメンバーを追加します。

**エンドポイント:** `POST /members`

**リクエストヘッダー:**

```
Content-Type: application/json
```

**リクエストボディ:**

```json
{
  "name": "次郎"
}
```

**フィールド説明:**

- `name`: メンバー名（文字列、必須、1 文字以上）

**レスポンス**

- **ステータスコード:** `201 Created`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "id": 3,
  "name": "次郎"
}
```

**エラーレスポンス:**

- `400 Bad Request`: バリデーションエラー

  - `name`が空文字列の場合

- `500 Internal Server Error`: サーバーエラー

---

### 2.3 メンバー削除

指定した ID のメンバーを削除します。

**エンドポイント:** `DELETE /members/{id}`

**パスパラメータ:**

- `id`: メンバー ID（整数、必須）

**レスポンス**

- **ステータスコード:** `204 No Content`
- **レスポンスボディ:** なし

**エラーレスポンス:**

- `404 Not Found`: 指定した ID のメンバーが存在しない

```json
{
  "error": "Not found",
  "message": "Member with id {id} not found"
}
```

- `500 Internal Server Error`: サーバーエラー

---

## 3. カテゴリ管理

### 3.1 カテゴリ一覧取得

登録されているカテゴリ一覧を取得します。

**エンドポイント:** `GET /categories`

**レスポンス**

- **ステータスコード:** `200 OK`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "categories": [
    {
      "id": 1,
      "name": "食費"
    },
    {
      "id": 2,
      "name": "日用品"
    }
  ]
}
```

**フィールド説明:**

- `categories`: カテゴリ一覧の配列
  - `id`: カテゴリ ID（整数）
  - `name`: カテゴリ名（文字列）

**エラーレスポンス:**

- `500 Internal Server Error`: サーバーエラー

---

### 3.2 カテゴリ追加

新しいカテゴリを追加します。

**エンドポイント:** `POST /categories`

**リクエストヘッダー:**

```
Content-Type: application/json
```

**リクエストボディ:**

```json
{
  "name": "通信費"
}
```

**フィールド説明:**

- `name`: カテゴリ名（文字列、必須、1 文字以上）

**レスポンス**

- **ステータスコード:** `201 Created`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "id": 10,
  "name": "通信費"
}
```

**エラーレスポンス:**

- `400 Bad Request`: バリデーションエラー

  - `name`が空文字列の場合

- `500 Internal Server Error`: サーバーエラー

---

### 3.3 カテゴリ削除

指定した ID のカテゴリを削除します。

**エンドポイント:** `DELETE /categories/{id}`

**パスパラメータ:**

- `id`: カテゴリ ID（整数、必須）

**レスポンス**

- **ステータスコード:** `204 No Content`
- **レスポンスボディ:** なし

**エラーレスポンス:**

- `404 Not Found`: 指定した ID のカテゴリが存在しない

```json
{
  "error": "Not found",
  "message": "Category with id {id} not found"
}
```

- `500 Internal Server Error`: サーバーエラー

---

## 4. 定期支払い管理

### 4.1 定期支払い一覧取得

登録されている定期支払い一覧を取得します。

**エンドポイント:** `GET /recurring-payments`

**レスポンス**

- **ステータスコード:** `200 OK`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "recurringPayments": [
    {
      "id": 1,
      "paidBy": "太郎",
      "amount": 50000,
      "category": "家賃",
      "frequency": "monthly",
      "memo": "家賃"
    }
  ]
}
```

**フィールド説明:**

- `recurringPayments`: 定期支払い一覧の配列
  - `id`: 定期支払い ID（整数）
  - `paidBy`: 支払う人の名前（文字列）
  - `amount`: 金額（整数、単位: 円）
  - `category`: カテゴリ（文字列）
  - `frequency`: 頻度（文字列、`weekly`または`monthly`）
  - `memo`: メモ（文字列、空文字列可）

**エラーレスポンス:**

- `500 Internal Server Error`: サーバーエラー

---

### 4.2 定期支払い追加

新しい定期支払いを追加します。

**エンドポイント:** `POST /recurring-payments`

**リクエストヘッダー:**

```
Content-Type: application/json
```

**リクエストボディ:**

```json
{
  "paidBy": "太郎",
  "amount": 50000,
  "category": "家賃",
  "frequency": "monthly",
  "memo": "家賃"
}
```

**フィールド説明:**

- `paidBy`: 支払う人の名前（文字列、必須、1 文字以上）
- `amount`: 金額（整数、必須、1 以上）
- `category`: カテゴリ（文字列、必須、1 文字以上）
- `frequency`: 頻度（文字列、必須、`weekly`または`monthly`）
- `memo`: メモ（文字列、オプション、空文字列可）

**レスポンス**

- **ステータスコード:** `201 Created`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "id": 1,
  "paidBy": "太郎",
  "amount": 50000,
  "category": "家賃",
  "frequency": "monthly",
  "memo": "家賃"
}
```

**エラーレスポンス:**

- `400 Bad Request`: バリデーションエラー

  - 必須フィールドが不足している場合
  - `amount`が 1 未満の場合
  - `frequency`が`weekly`または`monthly`以外の場合

- `500 Internal Server Error`: サーバーエラー

---

### 4.3 定期支払い削除

指定した ID の定期支払いを削除します。

**エンドポイント:** `DELETE /recurring-payments/{id}`

**パスパラメータ:**

- `id`: 定期支払い ID（整数、必須）

**レスポンス**

- **ステータスコード:** `204 No Content`
- **レスポンスボディ:** なし

**エラーレスポンス:**

- `404 Not Found`: 指定した ID の定期支払いが存在しない

```json
{
  "error": "Not found",
  "message": "Recurring payment with id {id} not found"
}
```

- `500 Internal Server Error`: サーバーエラー

---

## 5. 分析データ

### 5.1 分析データ取得

分析データを取得します。`target`パラメータで表示対象をフィルタリングできます。

**エンドポイント:** `GET /analytics/summary`

**クエリパラメータ:**

- `target` (string, optional): 表示対象。`all`またはメンバー名。デフォルトは`all`

**レスポンス**

- **ステータスコード:** `200 OK`
- **Content-Type:** `application/json`

**レスポンスボディ:**

```json
{
  "monthlyExpense": 252503,
  "totalExpense": 252503,
  "categoryExpenses": [
    {
      "category": "家賃",
      "amount": 250003,
      "percentage": 99.0,
      "color": "#475569"
    },
    {
      "category": "娯楽",
      "amount": 1500,
      "percentage": 0.6,
      "color": "#8b5cf6"
    }
  ],
  "members": ["太郎", "花子"]
}
```

**フィールド説明:**

- `monthlyExpense`: 今月の支出額（整数、単位: 円）
- `totalExpense`: 合計支出額（整数、単位: 円）
- `categoryExpenses`: カテゴリ別支出の配列
  - `category`: カテゴリ名（文字列）
  - `amount`: 金額（整数、単位: 円）
  - `percentage`: 全体に占める割合（数値、小数点第 1 位まで）
  - `color`: グラフ表示用の色コード（文字列、HEX 形式）
- `members`: メンバー名の配列（表示対象フィルタで使用）

**ビジネスロジック:**

1. `target`が`all`の場合: すべての支払いデータを対象
2. `target`がメンバー名の場合: そのメンバーが支払ったデータのみを対象
3. `totalExpense`: 対象となる支払いの`amount`の合計
4. `monthlyExpense`: 現在月の支払いの合計（簡易実装では`totalExpense`と同じ値）
5. `categoryExpenses`: カテゴリ別に集計し、金額の降順でソート
6. `percentage`: `(amount / totalExpense) * 100`を小数点第 1 位まで計算

**エラーレスポンス:**

- `500 Internal Server Error`: サーバーエラー

---

## バリデーションルール

### 共通ルール

- すべての金額は整数（単位: 円）で、1 以上である必要があります
- 文字列フィールドで必須のものは、空文字列不可です

### 支払い作成

- `paidBy`: 必須、1 文字以上
- `amount`: 必須、1 以上の整数
- `category`: 必須、1 文字以上
- `description`: オプション
- `date`: 必須、`YYYY-MM-DD`形式

### メンバー追加

- `name`: 必須、1 文字以上

### カテゴリ追加

- `name`: 必須、1 文字以上

### 定期支払い追加

- `paidBy`: 必須、1 文字以上
- `amount`: 必須、1 以上の整数
- `category`: 必須、1 文字以上
- `frequency`: 必須、`weekly`または`monthly`のみ
- `memo`: オプション
