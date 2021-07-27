import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { renderCardBackground } from "../../store/actions";

const Homepage = () => {
    const dispatch = useDispatch();
    const cardBackgroundRendered = useSelector(
        (state) => state.ui.cardsFalling,
    );

    useEffect(() => {
        if (!cardBackgroundRendered) {
            dispatch(renderCardBackground());
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
