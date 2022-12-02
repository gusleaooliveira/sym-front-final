import { loadFromLocalStorage, saveToLocalStorage } from './../../utils';
import { createStore, combineReducers } from 'redux';
import { reducer } from '../reducers';

const Reducer = combineReducers({
    clickState: reducer
});



export const Store = createStore(Reducer, loadFromLocalStorage())
Store.subscribe(() => saveToLocalStorage(Store.getState()));