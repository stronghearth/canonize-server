ALTER TABLE canonize_characters
    DROP COLUMN IF EXISTS user_id;

ALTER TABLE canonize_relationships
    DROP COLUMN IF EXISTS id_user;
    
DROP TABLE IF EXISTS canonize_users;