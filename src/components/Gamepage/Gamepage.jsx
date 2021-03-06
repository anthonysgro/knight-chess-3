import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { removeCardBackground } from "../../store/actions";

// Component Imports
import { ChessApp, Sidebar } from "../index";

const Gamepage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const cardBackgroundRendered = useSelector(
        (state) => state.ui.cardsFalling,
    );

    const { botBattle, localMultiplayer, onlineMultiplayer, sandbox } =
        useSelector((state) => state.gameModes);

    useEffect(() => {
        if (cardBackgroundRendered) {
            dispatch(removeCardBackground());
        }

        if (!botBattle && !localMultiplayer && !onlineMultiplayer && !sandbox) {
            history.push("/");
        }
    });

    return (
        <React.Fragment>
            <Sidebar />
            <ChessApp />
        </React.Fragment>
    );
};

export default Gamepage;
