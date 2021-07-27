import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// Component Imports
import { renderCards, removeCards } from "./card";

const Homepage = () => {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [cards, setCards] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        if (pageLoaded === false && cards === false) {
            renderCards();
            setCards(true);
            setPageLoaded(true);
        }
    });

    return (
        <React.Fragment>
            <div id="falling-chess-pieces">
                <div className="card">
                    <div className="card-text"></div>
                </div>
            </div>
            <div id="main-h1-container">
                <h1>
                    Play chess against friends from the comfort of your own home
                </h1>
                <a
                    id="opening-button"
                    href="/#/game"
                    onClick={() => {
                        setCards(false);
                        removeCards();
                    }}
                >
                    play
                </a>
            </div>
        </React.Fragment>
    );
};

export default Homepage;
