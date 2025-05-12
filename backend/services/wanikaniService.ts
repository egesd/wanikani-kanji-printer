import axios from 'axios';

const WANIKANI_API_BASE_URL = 'https://api.wanikani.com/v2';

interface WaniKaniResponse<T> {
    data: T[];
}

interface WaniKaniUserResponse {
    data: {
        username: string;
        level: number;
        profile_url: string;
    };
}

interface KanjiSubject {
    id: number;
    object: 'kanji';
    data: {
        characters: string;
        level: number;
    };
}

/**
 * Fetches user data from WaniKani API
 * @param apiKey WaniKani API key
 * @returns User data including username and level
 */
export async function fetchUserData(apiKey: string): Promise<WaniKaniUserResponse['data']> {
    try {
        const response = await axios.get<WaniKaniUserResponse>(
            `${WANIKANI_API_BASE_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Wanikani-Revision': '20170710'
                }
            }
        );

        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data from WaniKani API');
    }
}

/**
 * Fetches all kanji that the user has learned (Guru level or higher)
 * @param apiKey WaniKani API key
 * @returns Array of kanji characters
 */
export async function fetchLearnedKanji(apiKey: string): Promise<string[]> {
    try {
        // Fetch all guru-or-higher level kanji
        // Using stages: 5 (Guru I), 6 (Guru II), 7 (Master), 8 (Enlightened), 9 (Burned)
        const response = await axios.get<WaniKaniResponse<KanjiSubject>>(
            `${WANIKANI_API_BASE_URL}/subjects`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Wanikani-Revision': '20170710'
                },
                params: {
                    types: 'kanji',
                    srs_stages: '5,6,7,8,9'
                }
            }
        );

        // Extract just the kanji characters from the response
        return response.data.data.map(subject => subject.data.characters);
    } catch (error) {
        console.error('Error fetching kanji:', error);
        throw new Error('Failed to fetch kanji from WaniKani API');
    }
}