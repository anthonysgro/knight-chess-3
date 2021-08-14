import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

// React Router Links
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    startLocalMultiplayer,
    startBotBattle,
    startSandbox,
    resetInit,
    startLocalGame,
} from "../../store/actions";

import AreYouSure from "../AreYouSure.jsx";

const Header = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { onlineMultiplayer, localMultiplayer } = useSelector(
        (state) => state.gameModes,
    );
    const { gameCode } = useSelector((state) => state.gameInfo);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    const leaveOnlineGame = () => {
        dispatch(resetInit());
        window.socket.emit("leaveGame");
        dispatch(startLocalMultiplayer());
        dispatch(startLocalGame());
        onCloseModal();
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
                                    ? onOpenModal
                                    : () => dispatch(startLocalMultiplayer())
                            }
                        >
                            local multiplayer
                        </a>
                    </li>
                    <li>
                        <a href={onlineMultiplayer ? "/#/game" : "/#/lobby"}>
                            online multiplayer
                        </a>
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
            <AreYouSure
                open={open}
                onClose={onCloseModal}
                msg={
                    "You have an online game in progress. If you start a local multiplayer game, you will leave this one. Are you sure you want to leave?"
                }
                fn1={onCloseModal}
                fn2={leaveOnlineGame}
            />
        </header>
    );
};

export default Header;
