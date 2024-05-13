import { TOKEN_DICTIONARY } from '../dictionares/dictionares.js';
import { getKeyValue } from '../services/storage.service.js';

export const getLanguage = async () => await getKeyValue(TOKEN_DICTIONARY.lang) ?? 'en';		


