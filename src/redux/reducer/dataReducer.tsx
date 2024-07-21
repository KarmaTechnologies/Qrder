import {GET_CHEFS_DATA, GET_CITY_DATA, GET_CUISINES_DATA, GET_MENU_DATA, IS_LOADING, SET_APP_THEME} from '../actionTypes';

const initialState = {
  getCuisines:[],
  getMenuData:[],
  getChefsData:[],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CUISINES_DATA: {
      return {...state, getCuisines: action.payload};
    }
    case GET_MENU_DATA: {
      return {...state, getMenuData: action.payload};
    }
    case GET_CHEFS_DATA: {
      return {...state, getChefsData: action.payload};
    }
    default:
      return state;
  }
}
