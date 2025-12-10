# API要件一覧

このドキュメントは、フロントエンドの各画面で必要なAPIエンドポイントを一覧化したものです。
MSWでモック実装する際の参考として使用してください。

## ベースURL

```
http://localhost:8080/api
```

---

## 1. 支払いページ（Payment）

### 1.1 支払いサマリー取得 ✅ 実装済み

**エンドポイント:** `GET /payment/summary`

**説明:** 支払い状況と履歴を取得します。

**レスポンス:**
```json
{
  "members": [
    {
      "userId": 1,
      "userName": "太郎",
      "totalPaid": 251003,
      "balance": 124752
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

**実装状況:** MSWで実装済み

---

### 1.2 支払い作成 ⚠️ 要実装

**エンドポイント:** `POST /payment`

**説明:** 新しい支払いを追加します。

**リクエストボディ:**
```json
{
  "paidBy": "太郎",
  "amount": "5000",
  "category": "食費",
  "description": "スーパーで買い物",
  "date": "2024-12-02"
}
```

**レスポンス:**
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

**実装状況:** TODO（`payment/page.tsx`の`handlePaymentSubmit`で使用予定）

---

### 1.3 支払い削除 ✅ 実装済み

**エンドポイント:** `DELETE /payment/{id}`

**説明:** 指定したIDの支払いを削除します。

**実装状況:** MSWで実装が必要（`payment/page.tsx`の`handleDeletePayment`で使用中）

---

## 2. 設定ページ（Settings）

### 2.1 メンバー管理

#### 2.1.1 メンバー一覧取得 ⚠️ 要実装

**エンドポイント:** `GET /members`

**説明:** 登録されているメンバー一覧を取得します。

**レスポンス:**
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

**実装状況:** TODO（`settings/page.tsx`で初期データとして使用）

---

#### 2.1.2 メンバー追加 ⚠️ 要実装

**エンドポイント:** `POST /members`

**説明:** 新しいメンバーを追加します。

**リクエストボディ:**
```json
{
  "name": "次郎"
}
```

**レスポンス:**
```json
{
  "id": 3,
  "name": "次郎"
}
```

**実装状況:** TODO（`settings/page.tsx`の`handleSaveMembers`で使用予定）

---

#### 2.1.3 メンバー削除 ⚠️ 要実装

**エンドポイント:** `DELETE /members/{id}`

**説明:** 指定したIDのメンバーを削除します。

**実装状況:** TODO（`MemberManagement`コンポーネントで使用予定）

---

### 2.2 カテゴリ管理

#### 2.2.1 カテゴリ一覧取得 ⚠️ 要実装

**エンドポイント:** `GET /categories`

**説明:** 登録されているカテゴリ一覧を取得します。

**レスポンス:**
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

**実装状況:** TODO（`settings/page.tsx`で初期データとして使用）

---

#### 2.2.2 カテゴリ追加 ⚠️ 要実装

**エンドポイント:** `POST /categories`

**説明:** 新しいカテゴリを追加します。

**リクエストボディ:**
```json
{
  "name": "通信費"
}
```

**レスポンス:**
```json
{
  "id": 10,
  "name": "通信費"
}
```

**実装状況:** TODO（`settings/page.tsx`の`handleSaveCategories`で使用予定）

---

#### 2.2.3 カテゴリ削除 ⚠️ 要実装

**エンドポイント:** `DELETE /categories/{id}`

**説明:** 指定したIDのカテゴリを削除します。

**実装状況:** TODO（`CategoryManagement`コンポーネントで使用予定）

---

### 2.3 定期支払い管理

#### 2.3.1 定期支払い一覧取得 ⚠️ 要実装

**エンドポイント:** `GET /recurring-payments`

**説明:** 登録されている定期支払い一覧を取得します。

**レスポンス:**
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

**実装状況:** TODO（`settings/page.tsx`で初期データとして使用）

---

#### 2.3.2 定期支払い追加 ⚠️ 要実装

**エンドポイント:** `POST /recurring-payments`

**説明:** 新しい定期支払いを追加します。

**リクエストボディ:**
```json
{
  "paidBy": "太郎",
  "amount": "50000",
  "category": "家賃",
  "frequency": "monthly",
  "memo": "家賃"
}
```

**レスポンス:**
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

**実装状況:** TODO（`settings/page.tsx`の`handleSaveRecurringPayment`で使用予定）

---

#### 2.3.3 定期支払い削除 ⚠️ 要実装

**エンドポイント:** `DELETE /recurring-payments/{id}`

**説明:** 指定したIDの定期支払いを削除します。

**実装状況:** TODO（`RecurringPaymentManagement`コンポーネントで使用予定）

---

## 3. 分析ページ（Analytics）

### 3.1 分析データ取得 ⚠️ 要実装

**エンドポイント:** `GET /analytics/summary?target=all|{memberName}`

**説明:** 分析データを取得します。`target`パラメータで表示対象をフィルタリングできます。
- `target=all`: 全員のデータ
- `target={memberName}`: 指定メンバーのデータ（例: `target=太郎`）

**クエリパラメータ:**
- `target` (string, optional): 表示対象。`all`またはメンバー名。デフォルトは`all`

**レスポンス:**
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
    },
    {
      "category": "交際費",
      "amount": 500,
      "percentage": 0.2,
      "color": "#94a3b8"
    },
    {
      "category": "食費",
      "amount": 500,
      "percentage": 0.2,
      "color": "#64748b"
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
  - `percentage`: 全体に占める割合（数値、小数点第1位まで）
  - `color`: グラフ表示用の色コード（文字列、HEX形式）
- `members`: メンバー名の配列（表示対象フィルタで使用）

**実装状況:** TODO（`analytics/page.tsx`でサンプルデータを使用中）

---

## 実装優先度

### 高優先度（支払いページで使用中）
1. ✅ `GET /payment/summary` - 実装済み
2. ⚠️ `POST /payment` - 支払い追加機能で必要
3. ⚠️ `DELETE /payment/{id}` - 支払い削除機能で必要

### 中優先度（設定ページで使用予定）
4. ⚠️ `GET /members` - メンバー管理の初期表示で必要
5. ⚠️ `POST /members` - メンバー追加で必要
6. ⚠️ `DELETE /members/{id}` - メンバー削除で必要
7. ⚠️ `GET /categories` - カテゴリ管理の初期表示で必要
8. ⚠️ `POST /categories` - カテゴリ追加で必要
9. ⚠️ `DELETE /categories/{id}` - カテゴリ削除で必要
10. ⚠️ `GET /recurring-payments` - 定期支払い管理の初期表示で必要
11. ⚠️ `POST /recurring-payments` - 定期支払い追加で必要
12. ⚠️ `DELETE /recurring-payments/{id}` - 定期支払い削除で必要

### 低優先度（分析ページでサンプルデータ使用中）
13. ⚠️ `GET /analytics/summary` - 分析データ表示で必要

---

## データ型定義

### Member（メンバー）
```typescript
type Member = {
  id: number
  name: string
}
```

### Category（カテゴリ）
```typescript
type Category = {
  id: number
  name: string
}
```

### RecurringPayment（定期支払い）
```typescript
type RecurringPayment = {
  id: number
  paidBy: string
  amount: number
  category: string
  frequency: 'weekly' | 'monthly'
  memo: string
}
```

### AnalyticsSummary（分析サマリー）
```typescript
type CategoryExpense = {
  category: string
  amount: number
  percentage: number
  color: string
}

type AnalyticsSummary = {
  monthlyExpense: number
  totalExpense: number
  categoryExpenses: CategoryExpense[]
  members: string[]
}
```

---

## 注意事項

1. **認証**: 現在の実装では認証機能は含まれていませんが、将来的に追加する可能性があります
2. **エラーハンドリング**: 各APIは適切なHTTPステータスコード（400, 404, 500など）とエラーメッセージを返す必要があります
3. **バリデーション**: 
   - メンバー名、カテゴリ名は空文字列不可
   - 金額は1以上の整数
   - 頻度は`weekly`または`monthly`のみ
4. **日付形式**: 
   - 支払いの日付は`YYYY-MM-DD`形式で送信し、`MM/DD`形式で返却
   - 分析データの期間は現在月を対象とする想定

