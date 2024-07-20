import {GET_CITY_DATA, GET_CUISINES_DATA, IS_LOADING, SET_APP_THEME} from '../actionTypes';

const initialState = {
  getCuisines:[]
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CUISINES_DATA: {
      return {...state, getCuisines: action.payload};
    }
    case SET_APP_THEME: {
      return {...state, isDarkTheme: action.payload};
    }
    case GET_CITY_DATA: {
      return {...state, getCity: action.payload};
    }
    default:
      return state;
  }
}
