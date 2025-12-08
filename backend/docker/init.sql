-- データベース初期化スクリプト

-- usersテーブル作成
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- paymentsテーブル作成
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    description TEXT DEFAULT '',
    paid_by VARCHAR(255) NOT NULL,
    date VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(date);
CREATE INDEX IF NOT EXISTS idx_payments_paid_by ON payments(paid_by);

-- サンプルユーザーデータ
INSERT INTO users (name) VALUES 
    ('太郎'),
    ('花子')
ON CONFLICT (name) DO NOTHING;

-- サンプル支払いデータ
INSERT INTO payments (category, amount, description, paid_by, date) VALUES
    ('交際費', 500, '500', '太郎', '12/1'),
    ('家賃', 3, '', '太郎', '12/1'),
    ('家賃', 100000, '', '太郎', '12/1'),
    ('食費', 5000, 'スーパーで買い物', '太郎', '12/2'),
    ('光熱費', 15000, '電気代', '花子', '12/3'),
    ('通信費', 8500, '携帯料金', '太郎', '12/5');

