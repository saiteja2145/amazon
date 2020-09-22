import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./App.scss";
import Todo from "./Components/Todo";

import Reducer from "./Reducers";

function App() {
  const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <div className="App">
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
}

export default App;
