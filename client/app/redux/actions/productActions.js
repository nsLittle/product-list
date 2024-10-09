export const setCategoryOption = (category) => ({
  type: 'SET_CATEGORY_OPTION',
  payload: category
});

export const setPriceOption = (price) => ({
  type: 'SET_PRICE_OPTION',
  payload: price,
});

export const setSearchValue = (searchValue) => ({
  type: 'SET_SEARCH_VALUE',
  payload: searchValue,
});

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const resetFilters = () => ({
  type: 'RESET_FILTERS',
});