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
    const { onlineMultiplayer, localMultiplayer, botBattle } = useSelector(
        (state) => state.gameModes,
    );
    const { gameCode } = useSelector((state) => state.gameInfo);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const onOpenModal1 = () => setOpen1(true);
    const onCloseModal1 = () => setOpen1(false);
    const onOpenModal2 = () => setOpen2(true);
    const onCloseModal2 = () => setOpen2(false);

    const leaveOnlineToLocal = () => {
        dispatch(resetInit());
        window.socket.emit("leaveGame");
        dispatch(startLocalMultiplayer());
        dispatch(startLocalGame());
        onCloseModal1();
    };

    const leaveBotToLocal = () => {
        dispatch(resetInit());
        dispatch(startLocalMultiplayer());
        dispatch(startLocalGame());
        onCloseModal1();
    };

    const leaveOnlineToBot = () => {
        dispatch(resetInit());
        window.socket.emit("leaveGame");
        dispatch(startBotBattle());
        onCloseModal2();
    };

    const leaveLocalToBot = () => {
        dispatch(resetInit());
        dispatch(startBotBattle());
        onCloseModal2();
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
                                    ? onOpenModal1
                                    : botBattle
                                    ? onOpenModal1
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
                    <li>
                        <a
                            href="/#/game"
                            onClick={
                                onlineMultiplayer
                                    ? onOpenModal2
                                    : localMultiplayer
                                    ? onOpenModal2
                                    : () => dispatch(startBotBattle())
                            }
                        >
                            play my bot
                        </a>
                    </li>
                    {/*<li>
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
                open={open1}
                onClose={onCloseModal1}
                msg={
                    "You have a game in progress. If you start a new local game, you will leave this one. Are you sure you want to leave?"
                }
                fn1={onCloseModal1}
                fn2={onlineMultiplayer ? leaveOnlineToLocal : leaveBotToLocal}
            />
            <AreYouSure
                open={open2}
                onClose={onCloseModal2}
                msg={
                    "You have a game in progress. If you start a new bot battle, you will leave this one. Are you sure you want to leave?"
                }
                fn1={onCloseModal2}
                fn2={onlineMultiplayer ? leaveOnlineToBot : leaveLocalToBot}
            />
        </header>
    );
};

export default Header;
