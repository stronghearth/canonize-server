CREATE TABLE canonize_users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_modified TIMESTAMPTZ
);

ALTER TABLE canonize_characters
    ADD COLUMN 
    user_id INTEGER REFERENCES canonize_users(id)
    ON DELETE SET NULL;