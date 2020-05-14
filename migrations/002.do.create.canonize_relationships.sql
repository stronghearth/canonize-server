CREATE TABLE canonize_relationships (
    id SERIAL PRIMARY KEY,
    character_one INTEGER REFERENCES canonize_characters(id),
    character_two INTEGER REFERENCES canonize_characters(id),
    relationship_desc TEXT NOT NULL,
    antagonistic SMALLINT DEFAULT 0,
    friendly SMALLINT DEFAULT 0,
    mentor_mentee SMALLINT DEFAULT 0,
    business SMALLINT DEFAULT 0,
    romantic SMALLINT DEFAULT 0
);