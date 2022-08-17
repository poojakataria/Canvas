import React, { Component } from 'react';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import RootReducer from "./reducers";

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(RootReducer, allStoreEnhancers);

class App extends Component {
  render() {
    return (
      //To route to different pages
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* This has Child Component named as Main*/}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
