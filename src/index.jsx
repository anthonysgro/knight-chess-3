import React, { Component } from "react";
import ReactDom from "react-dom";

// Component Imports
import { Gamepage, Homepage, Header } from "./components";

// Drag 'n Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

ReactDom.render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Header />
                <main>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route path="/game" component={Gamepage} />
                    </Switch>
                </main>
            </Router>
        </DndProvider>
    </Provider>,
    document.querySelector("#app"),
);
