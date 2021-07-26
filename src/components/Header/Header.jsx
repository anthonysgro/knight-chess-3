import React, { Component } from "react";

// React Router Links
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.onscroll = () => {
            // Fighting the bug...
            // If you are within 5px of the top, we will trigger the animation immediately
            if (document.documentElement.scrollTop < 2) {
                document.getElementById("app-header").style.padding = "3.3vh";
                document.getElementById("app-header").style.boxShadow =
                    "0px -12px 9px 5px rgba(0, 0, 0, 0)";
                document.getElementById("app-header").style.transition = ".2s";
            } else {
                setTimeout(() => {
                    if (document.documentElement.scrollTop > 2) {
                        document.getElementById("app-header").style.padding =
                            "0vh";
                        document.getElementById("app-header").style.boxShadow =
                            "0px -5px 9px 5px rgba(0, 0, 0, 0.75)";
                        document.getElementById("app-header").style.transition =
                            ".2s";
                    }
                    // There's a weird bug if you sit around 50 px, so this
                    // gives user x milliseconds of buffer before it happens.
                    // it also delays our animation though so we can't go too crazy
                }, 100);
            }
        };
    }

    render() {
        return (
            <header id="app-header">
                <div id="main-logo-container">
                    <img
                        src="./images/logos/chess-piece.svg"
                        alt=""
                        id="main-logo"
                    />
                    <a id="logo-text" href="/">
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
                            <a href="#">local multiplayer</a>
                        </li>
                        <li>
                            <a href="#">online multiplayer</a>
                        </li>
                        <li>
                            <a href="#">play my bot</a>
                        </li>
                        <li>
                            <a href="#">sandbox</a>
                        </li>
                        <li>
                            <a href="#">about</a>
                        </li>
                    </ul>
                </section>
            </header>
        );
    }
}

export default Header;
