CREATE TABLE canonize_characters (
    id SERIAL PRIMARY KEY,
    character_name TEXT NOT NULL,
    age TEXT,
    gender TEXT,
    strongest_bonds TEXT,
    antagonist TEXT,
    appearance TEXT,
    mannerisms TEXT,
    general_desc TEXT NOT NULL,
    art_img TEXT,
    date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_modified TIMESTAMPTZ
);