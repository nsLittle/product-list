const initialState = {
  selectedCategoryOption: 'default',
  selectedPriceOption: 'default',
  items: {
    All_Products: [],
    Products_By_Category_Alpha: [],
    Products_By_Category_Alpha_Reverse: [],
    Products_By_Product_Alpha: [],
    Products_By_Product_Alpha_Reverse: [],
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
        items: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
