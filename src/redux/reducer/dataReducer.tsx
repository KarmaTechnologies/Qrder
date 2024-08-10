import {DELETE_CHEF_DATA, DELETE_MENU_DATA, GET_CHEFS_DATA, GET_CITY_DATA, GET_CUISINES_DATA, GET_MENU_DATA, IS_LOADING, SET_APP_THEME} from '../actionTypes';

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
    case DELETE_MENU_DATA: {
      const remove = state.getMenuData.filter(
        item => item?.id !== action.payload,
      );
      return { ...state, getMenuData: remove }; 
    }
    case DELETE_CHEF_DATA: {
      const remove = state.getMenuData.filter(
        item => item?.id !== action.payload,
      );
      return { ...state, getChefsData: remove }; 
    }
    default:
      return state;
  }
}
