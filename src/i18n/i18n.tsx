import {
} from 'react-native';
import I18n, { getLanguages } from 'react-native-i18n';

import en from './locales/en';
import hi from './locales/hi';

I18n.fallbacks = true;
I18n.translations = {en,hi};
I18n.locale = "en";

// The method we'll use instead of a regular string
export function strings(name:any, params = {}) {
    return I18n.t(name, params);
}

export default I18n;
