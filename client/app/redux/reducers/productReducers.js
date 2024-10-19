import { act } from "react";


const initialState = {
  selectedCategoryOption: 'default',
  selectedPriceOption: 'default',
  items: {
    All_Products: [],
    Queried_Products: [],
    Total_Products: 0,
    Total_Pages: 0,
    Current_Page: 0,
  },
  searchValue: '',
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_OPTION':
      return {
        ...state,
        selectedCategoryOption: action.payload,
      };
    case 'SET_PRICE_OPTION':
      return {
        ...state,
        selectedPriceOption: action.payload,
      };
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload,
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        items: {
          ...state.items,
          All_Products: action.payload.All_Products,
          Queried_Products: action.payload.Queried_Products,
          Total_Products: action.payload.Total_Products,
          Current_Page: action.payload.Current_Page,
          Total_Pages: action.payload.Total_Pages,
        }
      };
      case 'RESET_FILTERS':
        return {
          ...state,
          selectedCategoryOption: 'default',
          selectedPriceOption: 'default',
          searchValue: '',
        }
    default:
      return state;
  }
};

export default productsReducer;
