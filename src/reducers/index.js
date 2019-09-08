
import CarsReducers from './car';
import ActiveCar from './carActive';
import Basket from './basket'
import AddBasket from './add-basket';
import Categories from './categories';
import PromiseReducer from './promiseReducer'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';




const allReducers = combineReducers ({
  
   addBasket : AddBasket,
   categories: Categories,
   promiseReducer: PromiseReducer
   
});

export default createStore(allReducers,  compose(
   applyMiddleware(thunk),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))