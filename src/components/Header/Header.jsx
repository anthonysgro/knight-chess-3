import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

// React Router Links
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    startLocalMultiplayer,
    startBotBattle,
    startSandbox,
} from "../../store/actions";

import AreYouSure from "../AreYouSure.jsx";

const Header = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { onlineMultiplayer, localMultiplayer } = useSelector(
        (state) => state.gameModes,
    );
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    return (
        <header
            id="app-header"
            style={
                pathname !== "/"
                    ? { padding: "0vh", transition: ".4s", width: "96%" }
                    : { transition: ".4s" }
            }
        >
            <div id="main-logo-container">
                <a href="/#/">
                    <img
                        src="./images/logos/chess-piece.svg"
                        alt=""
                        id="main-logo"
                    />
                </a>
                <a id="logo-text" href="/#/">
                    KnightChess
                </a>
            </div>
            <input id="hamburger" className="hamburger" type="checkbox" />
            <label className="hamburger" htmlFor="hamburger">
                <div>
                    <span id="close">close</span>
                    <span id="open">menu</span>
                </div>
            </label>
            <section className="drawer-list">
                <ul>
                    <li>
                        <a
                            href="/#/game"
                            onClick={
                                onlineMultiplayer
                                    ? setOpen
                                    : () => dispatch(startLocalMultiplayer())
                            }
                        >
                            local multiplayer
                        </a>
                    </li>
                    <li>
                        <a href="/#/lobby">online multiplayer</a>
                    </li>
                    {/* <li>
                        <a
                            href="/#/bot"
                            onClick={() => dispatch(startBotBattle())}
                        >
                            play my bot
                        </a>
                    </li>
                    <li>
                        <a
                            href="/#/sandbox"
                            onClick={() => dispatch(startSandbox())}
                        >
                            sandbox
                        </a>
                    </li> */}
                    <li>
                        <a href="/#/about">about</a>
                    </li>
                </ul>
            </section>
            <AreYouSure open={open} onClose={onCloseModal} />
        </header>
    );
};

export default Header;
