import {
} from 'react-native';
import I18n, { getLanguages } from 'react-native-i18n';

import en from './locales/en';
import hi from './locales/hi';
import gj from './locales/gj';
import tm from './locales/tm';

I18n.fallbacks = true;
I18n.translations = {en,hi,gj,tm};
// I18n.locale = "en";


export function strings(name:any, params = {}) {
    return I18n.t(name, params);
}

export default I18n;
