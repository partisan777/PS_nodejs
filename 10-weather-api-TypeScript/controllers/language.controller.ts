import { TOKEN_DICTIONARY } from "../dictionares/dictionaries"; 
import { getKeyValue } from '../services/storage.service';
import { Language, KeyTokenDictionary } from "../types/types";

export const getLanguage = async (): Promise<Language> => await getKeyValue(TOKEN_DICTIONARY.lang as KeyTokenDictionary) ?? 'en';		
