import {DELETE_CHEF_DATA, DELETE_CUISINES_DATA, DELETE_MENU_DATA, GET_CANTEEN_CUISINE_LIST, GET_CANTEEN_MENU_LIST, GET_CHEFS_DATA, GET_CITY_DATA, GET_CUISINES_DATA, GET_MENU_DATA, GET_UNIVERSITIES_CANTEEN_LIST, GET_UNIVERSITIES_LIST, IS_LOADING, SET_APP_THEME} from '../actionTypes';

const initialState = {
  getCuisines:[],
  getMenuData:[],
  getChefsData:[],
  getUniversitiesData:[],
  getUniversityCanteenData:[],
  getCanteenMenuData:[],
  getCanteenCuisines:[]
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CUISINES_DATA: {
      return {...state, getCuisines: action.payload};
    }
    case GET_UNIVERSITIES_LIST: {      
      return {...state, getUniversitiesData: action.payload};
    }
    case GET_UNIVERSITIES_CANTEEN_LIST: {      
      return {...state, getUniversityCanteenData: action.payload};
    }
    case GET_CANTEEN_MENU_LIST: {      
      return {...state, getCanteenMenuData: action.payload};
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
      const removeChef = state.getChefsData.filter(
        item => item?.id !== action.payload,
      );
      console.log('getChefsData',removeChef);
      
      return { ...state, getChefsData: removeChef }; 
    }
    case DELETE_CUISINES_DATA: {
      const remove = state.getCuisines.filter(
        item => item?.id !== action.payload,
      );
      return { ...state, getCuisines: remove }; 
    }
    case GET_CANTEEN_CUISINE_LIST: {
      return {...state, getCanteenCuisines: action.payload};
    }
    default:
      return state;
  }
}
