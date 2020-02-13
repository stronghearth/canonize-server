BEGIN;

TRUNCATE
    canonize_characters,
    canonize_users
    RESTART IDENTITY CASCADE;

INSERT INTO canonize_users (user_name, password, full_name)
VALUES 
('canonize_guest', '$2a$10$jotDh5MLCeiio2YcVvx3w.FibDgZce5SZVx523uyZ6dSZXyHUIPrK', 'Canonizer'),
('gamer145', '$2a$10$RbzrEfVabcTMG31XYaXteOcx54zaQTXhzwO2Cwi280RAVVuN6HSQm', 'Gamer Man');

INSERT INTO canonize_characters (character_name, age, gender, strongest_bonds, antagonist, appearance, mannerisms, general_desc, art_img, date_created, user_id)
VALUES 
    ('Amber Stronghearth', '65', 'She/Her', 'Grug Tug-o-Lug, Kelemvor', 'The Lord of Lies, Anton?', 'long braided red-hair, wears long grey spine chilling cloak', 'speaks in a light dwarvish accent, keeps quiet until she really has something to say', 'A dwarvish grave cleric serving Kelemvor, do not mess with her', 'https://i.pinimg.com/564x/cb/86/7a/cb867ab25a1c480b81c279af9c528b02.jpg', '2019-01-22T16:28:32.615Z', 1),
    ('Beatrice DeForest', '35', 'She/Her', 'The Guilders', 'Anyone challenging her honor', 'medium length brown hair, wears long deep reddish-brown coat', 'Savannah GA type accent, has manners but also can be full of sass', 'A human swashbuckling rogue wanting to make a name for herself', 'https://i.pinimg.com/564x/e9/47/fb/e947fb908697952377e6a5638bdb5460.jpg', '2019-01-19T16:28:32.615Z', 1),
    ('Ellandra Berevan', '109', 'They/Them', 'Their mysterious patron', 'Argan Berevan', 'blonde, curly hair, 6ft tall, pointy ears, always sleepy eyes', 'obsessively writes down all their dreams in a notebook', 'an elf with a dark secret', 'https://i.pinimg.com/564x/7a/19/03/7a1903e84d0dad7bae11291a5730d596.jpg', '2019-01-08T16:28:32.615Z', 1),
    ('Feather in the Wind of the Twisting Forest Clan', '25', 'She/Her', 'Her mission to solve the mystery surrounding the obliteration of her tribe', 'Colonizers', 'Brown-orange fur, tall, slender, blue cat eyes', 'Ditzy in social situations, competent in battle', 'A tabaxi fighter on a mission', 'https://i.pinimg.com/564x/54/55/8c/54558c0498dbbfb3b5cd67afcf35daba.jpg', '2019-01-31T16:28:32.615Z', 1),
    ('Olivia', '30', 'She/her', 'Her music and guildmates', 'Those who seek to disrupt the good in life', 'Blonde curly hair, wears armor modified with danceable flair', 'Enthusiastically tries to motivate others whether they want the support or not', 'A bard who tries to find the right words to say and observe the humanities', 'https://i.pinimg.com/564x/65/ce/e8/65cee8fed28873e5332df0df37469c28.jpg','2019-01-01T16:28:32.615Z', 1);

COMMIT;
