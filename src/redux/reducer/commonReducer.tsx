import {DECREMENT, GET_CITY_DATA, INCREMENT, IS_LOADING, SEARCH_CITY, SELECT_ROLE, SET_APP_LANGUAGE, SET_APP_THEME} from '../actionTypes';

const initialState = {
  isLoading: false,
  isDarkTheme: false,
  searchCity:[],
  selectedRole:'',
  isLanguage:'en',
  getCity: [
    {
      id: 1041,
      name: 'Surat',
      state_id: 12,
      created_at: null,
      updated_at: null,
      state_name: 'Gujarat',
      state: {
        id: 12,
        name: 'Gujarat',
        country_id: 1,
        created_at: null,
        updated_at: null,
        country_name: 'India',
        country: {
          id: 1,
          name: 'India',
          created_at: null,
          updated_at: null,
        },
      },
    },
    {
      "id": 1043,
      "name": "Talaja",
      "state_id": 12,
      "created_at": null,
      "updated_at": null,
      "state_name": "Gujarat",
      "state": {
          "id": 12,
          "name": "Gujarat",
          "country_id": 1,
          "created_at": null,
          "updated_at": null,
          "country_name": "India",
          "country": {
              "id": 1,
              "name": "India",
              "created_at": null,
              "updated_at": null
          }
      }
  },
  ],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case IS_LOADING: {
      return {...state, isLoading: action.payload};
    }
    case SET_APP_THEME: {
      return {...state, isDarkTheme: action.payload};
    }
    case GET_CITY_DATA: {
      return {...state, getCity: action.payload};
    }
    case SEARCH_CITY: {
      return {...state, searchCity: action.payload};
    }
    case SELECT_ROLE: {
      return {...state, selectedRole: action.payload};
    }
    case SET_APP_LANGUAGE: {
      return {...state, isLanguage: action.payload};
    }
    default:
      return state;
  }
}
