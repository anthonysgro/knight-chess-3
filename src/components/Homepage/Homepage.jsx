import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { renderCardBackground, resetInit } from "../../store/actions";

const Homepage = () => {
    const dispatch = useDispatch();
    const cardBackgroundRendered = useSelector(
        (state) => state.ui.cardsFalling,
    );

    const { endGame } = useSelector((state) => state.boardState.endGameInfo);

    useEffect(() => {
        if (!cardBackgroundRendered) {
            dispatch(renderCardBackground());
        }
        // If you load the homepage and your game is over, reset everything.
        if (endGame) {
            dispatch(resetInit());
        }
    });

    return (
        <React.Fragment>
            <div id="main-h1-container">
                <h1>
                    Play chess against friends from the comfort of your own home
                </h1>
                <a id="opening-button" href="/#/lobby">
                    play
                </a>
            </div>
        </React.Fragment>
    );
};

export default Homepage;
