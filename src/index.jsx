import React, { Component } from "react";
import ReactDom from "react-dom";

// Component Imports
import { ChessApp } from "./components";

// Drag 'n Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <ChessApp />
        </DndProvider>
    </Provider>,
    document.querySelector("#app"),
);
