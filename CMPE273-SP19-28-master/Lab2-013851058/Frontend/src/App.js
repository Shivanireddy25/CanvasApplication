import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';


import { Provider } from 'react-redux';
import reducer from './reducers/indexReducers';
import { initialState } from './reducers/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { autoRehydrate } from 'redux-persist';


import promise from "redux-promise";
import ReduxThunk from 'redux-thunk';



const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStore(reducer, composePlugin(applyMiddleware(ReduxThunk)));


/*const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStore(reducer, composePlugin(applyMiddleware(promise,ReduxThunk))); */



//App Component
class App extends Component {

  componentDidMount() {
    persistStore(store , {
      
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
        <div>
          <Main />
        </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

