-- データベース初期化スクリプト

-- usersテーブル作成
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- booksテーブル作成
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- paymentsテーブル作成
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    description TEXT DEFAULT '',
    paid_by INTEGER NOT NULL,
    date VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    book_id INTEGER NOT NULL,

    CONSTRAINT fk_payment_book
        FOREIGN KEY (book_id)
        REFERENCES books(id), 
    CONSTRAINT fk_payment_user
        FOREIGN KEY (paid_by)
        REFERENCES users(id),
    CONSTRAINT fk_payment_categories
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);


-- booksとusersの中間テーブル
CREATE TABLE IF NOT EXISTS user_book_members (
    user_id INTEGER,
    book_id INTEGER,
    PRIMARY KEY (user_id, book_id),

    CONSTRAINT fk_user_members
        FOREIGN KEY (user_id)
        REFERENCES users(id),
    CONSTRAINT fk_book_members
        FOREIGN KEY (book_id)
        REFERENCES books(id)
);




-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(date);
CREATE INDEX IF NOT EXISTS idx_payments_paid_by ON payments(paid_by);

-- サンプルユーザーデータ
INSERT INTO users (name, mail) VALUES 
    ('太郎', 'taro@example.com', 'password'),
    ('花子', 'hanako@example.com', 'password'),
    ('次郎', 'jiro@example.com', 'password')
ON CONFLICT (mail) DO NOTHING;

-- サンプルカテゴリデータ
INSERT INTO categories (name) VALUES 
    ('家賃'),
    ('食費'),
    ('交際費'),
    ('光熱費'),
    ('通信費')
ON CONFLICT (name) DO NOTHING;

-- サンプル家計簿データ
INSERT INTO books (id, name) VALUES 
    (1, 'メイン家計簿'),
    (2, '旅行割勘')
ON CONFLICT (id) DO NOTHING;

-- サンプル家計簿メンバー
INSERT INTO user_book_members (user_id, book_id) VALUES
    ((SELECT id FROM users WHERE name = '太郎'), 1),
    ((SELECT id FROM users WHERE name = '花子'), 1),
    ((SELECT id FROM users WHERE name = '次郎'), 2)
ON CONFLICT DO NOTHING;

-- サンプル支払いデータ
INSERT INTO payments (category_id, amount, description, paid_by, date, book_id) VALUES
    ((SELECT id FROM categories WHERE name = '交際費'), 500, '飲み会', (SELECT id FROM users WHERE name = '太郎'), '2024-12-01', 1),
    ((SELECT id FROM categories WHERE name = '家賃'), 100000, '', (SELECT id FROM users WHERE name = '太郎'), '2024-12-01', 1),
    ((SELECT id FROM categories WHERE name = '食費'), 5000, 'スーパーで買い物', (SELECT id FROM users WHERE name = '太郎'), '2024-12-02', 1),
    ((SELECT id FROM categories WHERE name = '光熱費'), 15000, '電気代', (SELECT id FROM users WHERE name = '花子'), '2024-12-03', 1),
    ((SELECT id FROM categories WHERE name = '通信費'), 8500, '携帯料金', (SELECT id FROM users WHERE name = '太郎'), '2024-12-05', 1),
    ((SELECT id FROM categories WHERE name = '食費'), 3200, '昼食', (SELECT id FROM users WHERE name = '次郎'), '2024-12-06', 2);
