import express, { Request, Response, Router } from 'express';
import { RequestHandler } from 'express';
import { fetchUserData, fetchLearnedKanji } from '../services/wanikaniService';

const router: Router = express.Router();

// Define interfaces for request types
interface AuthBody {
    apiKey: string;
}

interface KanjiQuery {
    apiKey?: string;
}

// Define request handlers with proper typing
const authHandler: RequestHandler<{}, any, AuthBody> = async (req, res) => {
    const { apiKey } = req.body;
    if (!apiKey) {
        res.status(400).json({ error: 'API key is required' });
        return;
    }

    try {
        const userData = await fetchUserData(apiKey);
        res.json(userData);
    } catch (error: unknown) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

const kanjiHandler: RequestHandler<{}, any, {}, KanjiQuery> = async (req, res) => {
    const { apiKey } = req.query;
    if (!apiKey || typeof apiKey !== 'string') {
        res.status(400).json({ error: 'API key is required and must be a string' });
        return;
    }

    try {
        const kanji = await fetchLearnedKanji(apiKey);
        res.json(kanji);
    } catch (error: unknown) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};


function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error occurred';
}

// Define routes
router.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the Svelte Node App API');
});

router.post('/auth', authHandler);
router.get('/kanji', kanjiHandler);

export default router;