import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCardBackground } from "../../store/actions";

// Component Imports
import { ChessApp, Sidebar } from "../index";

const Gamepage = () => {
    const dispatch = useDispatch();
    const cardBackgroundRendered = useSelector(
        (state) => state.ui.cardsFalling,
    );

    useEffect(() => {
        if (cardBackgroundRendered) {
            dispatch(removeCardBackground());
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
