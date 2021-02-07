import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  priceRange : {},
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under30k: [],
    under50k: [],
    above50k: [],
  },
  pageRequest: false,
  page: {},
  productDetails: {},
  loading:false
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      return (state = {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      });

    case productConstants.GET_PRODUCT_PAGE_REQUEST:
      return(
        (state = {
          ...state,
          pageRequest: true,
        })
      );

    case productConstants.GET_PRODUCT_PAGE_SUCCESS:
      return (state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      });

    case productConstants.GET_PRODUCT_PAGE_FAILURE:
      return (state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      });

    case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      return(state = {
        ...state,
        loading: true,
      });
      
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return(state = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      });
      
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      return(state = {
        ...state,
        loading: false,
        error: action.payload.error,
      });
      
    default:
      return state;
  }
};

export default productReducer;