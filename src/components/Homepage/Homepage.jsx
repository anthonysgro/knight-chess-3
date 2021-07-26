import React, { Component } from "react";

// Component Imports
import { Header } from "../index";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <div className="main-screen">
                    <Header />
                    <main>
                        {/* <div class="centerfold" id="homepage-centerfold">
                            <h1 id="welcome">Play Chess Online with Knight</h1>
                            <p>
                                KnightChess is a free online chess platform that
                                allows you to quickly play with friends. Get
                                started today!
                            </p>
                            <div id="main-btn-container">
                                <button id="play-now">
                                    <p id="play-now-text">Play Now&nbsp;</p>
                                    <svg
                                        id="play-now-text2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-arrow-right ml-2"
                                    >
                                        <line
                                            x1="5"
                                            y1="12"
                                            x2="19"
                                            y2="12"
                                        ></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div> */}
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default Homepage;
