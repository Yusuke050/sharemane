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
- (TBD: フレームワーク、データベースなど)

### セットアップ

```bash
cd backend
go mod download
go run main.go
```

## API仕様

API仕様書は `backend/API_SPEC.md` を参照してください。

## 開発ルール

- コンポーネントは必ずフォルダを作成し、その中に`index.tsx`と`index.css`を配置すること
- Figmaのデザイン確認時は必ずMCPツール(`mcp_Figma_Desktop_get_screenshot`と`mcp_Figma_Desktop_get_design_context`)を使用すること

詳細は `frontend/.cursor/rules/project.mdc` を参照してください。

