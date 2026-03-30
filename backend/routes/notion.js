const express = require('express');
const { Client } = require('@notionhq/client');

const router = express.Router();
const notion = new Client({ auth: process.env.NOTION_API_KEY || process.env.NOTION_KEY });

router.get('/focus-themes', async (req, res) => {
    try {
        const database = await notion.databases.retrieve({
            database_id: process.env.NOTION_DATABASE_ID,
        });

        const options = database.properties.focus_theme?.select?.options?.map((option) => option.name) || [];
        res.json(options);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch focus themes' });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            sorts: [{ property: 'date', direction: 'descending' }],
        });

        const entries = response.results.map(page => ({
            id: page.properties.id?.title?.[0]?.plain_text || '',
            date: page.properties.date?.date?.start || '',
            focus_theme:
                page.properties.focus_theme?.select?.name ||
                page.properties.focus_theme?.rich_text?.[0]?.plain_text ||
                '',
            wins: page.properties.wins?.rich_text?.[0]?.plain_text || '',
            mistakes: page.properties.mistakes?.rich_text?.[0]?.plain_text || '',
        }));

        res.json(entries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch Notion entries' });
    }
});

router.post('/log', async (req, res) => {
    const { focus_theme, wins, mistakes } = req.body;
    const theme = (focus_theme || '').trim();
    const winsText = (wins || '').trim();
    const mistakesText = (mistakes || '').trim();

    if (!theme) {
        return res.status(400).json({ error: 'focus_theme is required' });
    }

    try {
        const properties = {
            date: {
                date: {
                    start: new Date().toISOString(),
                },
            },
            focus_theme: {
                select: { name: theme },
            },
        };

        if (winsText) {
            properties.wins = {
                rich_text: [{ text: { content: winsText } }],
            };
        }

        if (mistakesText) {
            properties.mistakes = {
                rich_text: [{ text: { content: mistakesText } }],
            };
        }

        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties,
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create Notion entry' });
    }
});

module.exports = router;
