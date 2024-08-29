import { DECREMENT, DELETE_CARD_LIST, DELETE_CHEF_DATA, DELETE_CUISINES_DATA, DELETE_MENU_DATA, GET_CANTEEN_CUISINE_LIST, GET_CANTEEN_MENU_LIST, GET_CARD_LIST, GET_CHEFS_DATA, GET_CITY_DATA, GET_CUISINES_DATA, GET_EMPTY_CANTEEN_LIST, GET_EMPTY_MENU_LIST, GET_MENU_DATA, GET_UNIVERSITIES_CANTEEN_LIST, GET_UNIVERSITIES_LIST, INCREMENT, IS_LOADING, SET_APP_THEME } from '../actionTypes';

const initialState = {
  getCuisines: [],
  getMenuData: [],
  getChefsData: [],
  getUniversitiesData: [],
  getUniversityCanteenData: [],
  getCanteenMenuData: [],
  getCanteenCuisines: [],
  getCardData: [],
  allMenuCount: 0,
  cuisinesCount: 0,
  canteenMenuCount: 0
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CUISINES_DATA: {
      return {
        ...state,
        getCuisines:
          action.payload.current_page == 1
            ? action.payload.data
            : [...state.getCuisines, ...action.payload.data],
        cuisinesCount: action.payload.total_count,
      };
    }
    case GET_UNIVERSITIES_LIST: {
      return { ...state, getUniversitiesData: action.payload };
    }
    case GET_UNIVERSITIES_CANTEEN_LIST: {
      return { ...state, getUniversityCanteenData: action.payload };
    }
    case GET_CANTEEN_MENU_LIST: {
      if (action.payload.current_page == 1) {
        return {
          ...state,
          getCanteenMenuData: action.payload.data,
          canteenMenuCount: action.payload.total_count,
        };
      } else {
        return {
          ...state,
          getCanteenMenuData: [...state.getCanteenMenuData, ...action.payload.data],
          canteenMenuCount: action.payload.total_count,
        };
      }
    }
    case GET_EMPTY_CANTEEN_LIST: {
      return { ...state, getCanteenMenuData: [], canteenMenuCount: 0 };
    }
    case GET_EMPTY_MENU_LIST: {
      return { ...state, getMenuData: [], allMenuCount: 0 };
    }
    case GET_MENU_DATA: {
      if (action.payload.current_page == 1) {
        return {
          ...state,
          getMenuData: action.payload.data,
          allMenuCount: action.payload.total_count,
        };
      } else {
        return {
          ...state,
          getMenuData: [...state.getMenuData, ...action.payload.data],
          allMenuCount: action.payload.total_count,
        };
      }
    }
    case GET_CHEFS_DATA: {
      return { ...state, getChefsData: action.payload };
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
      return { ...state, getChefsData: removeChef };
    }
    case DELETE_CUISINES_DATA: {
      const remove = state.getCuisines.filter(
        item => item?.id !== action.payload,
      );
      return { ...state, getCuisines: remove };
    }
    case GET_CANTEEN_CUISINE_LIST: {
      return { ...state, getCanteenCuisines: action.payload };
    }
    case GET_CARD_LIST: {
      return { ...state, getCardData: action.payload };
    }
    case DELETE_CARD_LIST: {
      const removeCard = state.getCardData.filter(
        item => item?.id !== action.payload,
      );
      return { ...state, getCardData: removeCard };
    }
    case INCREMENT: {
      const updatedCardData = state.getCardData.map((item: any) => {
        return (
          item.menu_id === action.payload
            ? { ...item, quantity: item.quantity + 1, price: item.price * (item.quantity + 1) }
            : item
        )
      });
      return {
        ...state,
        getCardData: updatedCardData,
      };
    }
    case DECREMENT: {
      const updatedCardData = state.getCardData.map((item: any) =>
        item.menu_id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, price: item.price * (item.quantity - 1) }
          : item
      );
      return {
        ...state,
        getCardData: updatedCardData,
      };
    }
    default:
      return state;
  }
}
