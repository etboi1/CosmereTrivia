module.exports = [
    {
        id: 1,
        question: "Which planet is Hoid (Wit) from?",
        correctQuery: `
            SELECT p.planet_name AS answer
            FROM characters c
            INNER JOIN planets p ON c.planet_of_origin = p.planet_id
            WHERE c.char_first_name = 'Hoid (Wit)';
        `,
        wrongQuery: `
            SELECT planet_name AS answer
            FROM planets
            WHERE planet_name NOT IN (
                SELECT p.planet_name AS answer
                FROM characters c
                INNER JOIN planets p ON c.planet_of_origin = p.planet_id
                WHERE c.char_first_name = 'Hoid (Wit)';
            )
            ORDER BY RAND()
            LIMIT 3;
        `
    },
    {
        id: 2,
        question: "Which book does the character Felt NOT appear in?",
        correctQuery: `
            SELECT b.title AS answer
            FROM books b
            INNER JOIN series s ON b.series_id = s.series_id
            WHERE s.series_title IN ('Stormlight Archives', 'Mistborn Era 1', 'Mistborn Era 2')
                AND title NOT IN (
                    SELECT b.title
                    FROM characters c
                    INNER JOIN book_characters bc ON c.character_id = bc.character_id
                    INNER JOIN books b ON bc.book_id = b.book_id
                    WHERE c.char_first_name = 'Felt'
                )
            ORDER BY RAND()
            LIMIT 1;
        `,
        wrongQuery: `
            SELECT b.title AS answer
            FROM characters c
            INNER JOIN book_characters bc ON c.character_id = bc.character_id
            INNER JOIN books b ON bc.book_id = b.book_id
            WHERE c.char_first_name = 'Felt'
            ORDER BY RAND()
            LIMIT 3;
        `
    },
    {
        id: 3,
        question: "What type of spren is Glys?",
        correctQuery: `
            SELECT cma.description AS answer
            FROM characters c
            INNER JOIN character_magic_abilities cma ON c.character_id = cma.character_id
            WHERE c.char_first_name = 'Glys';
        `,
        wrongQuery: `
            SELECT cma.description AS answer
            FROM characters c
            INNER JOIN character_magic_abilities cma ON c.character_id = cma.character_id
            WHERE c.char_first_name <> 'Glys'
            ORDER BY RAND()
            LIMIT 3;
        `
    },
    {
        id: 4,
        question: "How many books does Hoid (Wit) appear in, either identified as himself, or not?",
        correctQuery: `
            SELECT COUNT(bc.book_id) AS answer
            FROM characters c
            INNER JOIN book_characters bc ON c.character_id = bc.character_id
            WHERE c.char_first_name = 'Hoid (Wit)'
            GROUP BY c.character_id;
        `,
        wrongQuery: `
            WITH RECURSIVE nums AS (
                SELECT 15 AS n
                UNION ALL
                SELECT n + 1 FROM nums WHERE n < 25
            )
            SELECT n AS answer
            FROM nums
            WHERE n <> 18
            ORDER BY RAND()
            LIMIT 3;
        `
    },
    {
        id: 5, 
        question: "Which book does Kelsier NOT appear in?",
        correctQuery: `
            SELECT b.title AS answer
            FROM books b
            INNER JOIN series s ON b.series_id = s.series_id
            WHERE s.series_title = 'Mistborn Era 2'
                AND b.title NOT IN (
                    SELECT b.title AS answer
                    FROM characters c
                    INNER JOIN book_characters bc ON c.character_id = bc.character_id
                    INNER JOIN books b ON bc.book_id = b.book_id
                    WHERE c.char_first_name = 'Kelsier'
                )
            ORDER BY RAND()
            LIMIT 1;
        `,
        wrongQuery: `
            SELECT b.title AS answer
            FROM characters c
            INNER JOIN book_characters bc ON c.character_id = bc.character_id
            INNER JOIN books b ON bc.book_id = b.book_id
            WHERE c.char_first_name = 'Kelsier'
            ORDER BY RAND()
            LIMIT 3;
        `
    },
    {
        id: 6,
        question: "What order of the Knights Radiant does Dalinar Kholin belong to?",
        correctQuery: `
            SELECT cma.description
            FROM characters c
            INNER JOIN character_magic_abilities cma ON c.character_id = cma.character_id
            WHERE c.char_first_name = 'Dalinar';
        `,
        wrongQuery: `
            SELECT DISTINCT cma.specific_abilities
            FROM characters c
            INNER JOIN character_magic_abilities cma ON c.character_id = cma.character_id
            INNER JOIN magic_systems ms ON cma.magic_system_id = ms.magic_system_id
            WHERE cma.specific_abilities <> 'Bondsmith'
                AND ms.system_name = 'Surgebinding'
                AND cma.specific_abilities NOT LIKE '%Spren%'
                AND cma.specific_abilities NOT LIKE '%,%'
                AND cma.specific_abilities NOT LIKE 'ing'
            ORDER BY RAND()
            LIMIT 3;
        `
    }
]