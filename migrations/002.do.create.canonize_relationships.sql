CREATE TABLE canonize_relationships (
    id SERIAL PRIMARY KEY,
    character_one INTEGER REFERENCES canonize_characters(id) ON DELETE CASCADE NOT NULL,
    character_two INTEGER REFERENCES canonize_characters(id) ON DELETE CASCADE NOT NULL,
    relationship_desc TEXT NOT NULL,
    antagonistic SMALLINT DEFAULT 0,
    friendly SMALLINT DEFAULT 0,
    mentor_mentee SMALLINT DEFAULT 0,
    business SMALLINT DEFAULT 0,
    romantic SMALLINT DEFAULT 0,
    created_date TIMESTAMPTZ NOT NULL DEFAULT now()
);