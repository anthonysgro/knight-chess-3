import React, { Component } from "react";
import ReactDom from "react-dom";

// Component Imports
import { Gamepage, Homepage, Header, Lobby } from "./components";

// Drag 'n Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Instantiate Socket Listeners
import { io } from "socket.io-client";
import enableSocketListeners from "./sockets";
enableSocketListeners(io);

ReactDom.render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
            <Router>
                <div id="falling-chess-pieces">
                    <div className="card">
                        <div className="card-text"></div>
                    </div>
                </div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/lobby" component={Lobby} />
                        <Route path="/game" component={Gamepage} />
                    </Switch>
                </main>
            </Router>
        </DndProvider>
    </Provider>,
    document.querySelector("#app"),
);
