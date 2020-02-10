ALTER TABLE canonize_characters
    DROP COLUMN IF EXISTS user_id;
    
DROP TABLE IF EXISTS canonize_users;