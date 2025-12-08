# Sharemane

共同家計簿・割り勘アプリ

## プロジェクト構成

```
sharemane/
├── frontend/     # Next.js + React フロントエンド
└── backend/      # Go バックエンド API
```

## Frontend

### 技術スタック
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Storybook
- MSW (Mock Service Worker)

### セットアップ

```bash
cd frontend
pnpm install
pnpm dev
```

### Storybook

```bash
cd frontend
pnpm storybook
```

## Backend

### 技術スタック
- Go
- PostgreSQL 16
- Docker & Docker Compose

### セットアップ

#### 1. データベース起動

```bash
# Docker Composeでデータベースを起動
docker-compose up -d

# 起動確認
docker-compose ps

# ログ確認
docker-compose logs postgres
```

#### 2. 環境変数設定

```bash
cd backend
cp .env.example .env
# 必要に応じて.envを編集
```

#### 3. バックエンド起動

```bash
cd backend
go mod download
go run server.go
```

### データベース操作

```bash
# データベースに接続
docker-compose exec postgres psql -U sharemane -d sharemane

# データベース停止
docker-compose down

# データベースを完全に削除（データも削除）
docker-compose down -v
```

## API仕様

API仕様書は `backend/API_SPEC.md` を参照してください。

## 開発ルール

- コンポーネントは必ずフォルダを作成し、その中に`index.tsx`と`index.css`を配置すること
- Figmaのデザイン確認時は必ずMCPツール(`mcp_Figma_Desktop_get_screenshot`と`mcp_Figma_Desktop_get_design_context`)を使用すること

詳細は `frontend/.cursor/rules/project.mdc` を参照してください。

