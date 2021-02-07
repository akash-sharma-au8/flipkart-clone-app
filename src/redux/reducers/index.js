import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import cartReducer from "./cart.Reducer";
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  categoryState: categoryReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  userState: userReducer,
});

export default rootReducer;
