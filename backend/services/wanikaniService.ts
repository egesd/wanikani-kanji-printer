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

interface Assignment {
    data: {
        subject_id: number;
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
        console.log('Fetching assignments...');
        const assignmentsResponse = await axios.get<WaniKaniResponse<{ data: { subject_id: number } }>>(
            `${WANIKANI_API_BASE_URL}/assignments`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Wanikani-Revision': '20170710'
                },
                params: {
                    subject_types: 'kanji',
                    srs_stages: '5,6,7,8,9' // Guru and above
                }
            }
        );

        console.log('Full Assignments Response:', JSON.stringify(assignmentsResponse.data, null, 2));

        const kanjiAssignments = assignmentsResponse.data.data;

        if (kanjiAssignments.length === 0) {
            console.warn('No kanji found at Guru or higher.');
            return [];
        }

        const subjectIds = kanjiAssignments.map(assignment => assignment.data.subject_id);
        console.log('Subject IDs:', subjectIds);

        const subjectsResponse = await axios.get<WaniKaniResponse<KanjiSubject>>(
            `${WANIKANI_API_BASE_URL}/subjects`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Wanikani-Revision': '20170710'
                },
                params: {
                    ids: subjectIds.join(',')
                }
            }
        );

        const kanjiCharacters = subjectsResponse.data.data.map(subject => subject.data.characters);
        console.log('Kanji Characters:', kanjiCharacters);

        return kanjiCharacters;
    } catch (error) {
        console.error('Error fetching kanji:', error);
        throw new Error('Failed to fetch kanji from WaniKani API');
    }
}