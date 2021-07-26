import React, { Component } from "react";

// React Router Links
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return "placeholder";
        // <header>
        //     <nav>
        //         <div id="logo-container">
        //             <Link to="/">
        //                 <img
        //                     id="main-logo"
        //                     src="/images/logos/knightChessLogo-sm.png"
        //                     alt=""
        //                 />
        //             </Link>
        //         </div>
        //         <Link id="main-text" to="/">
        //             KnightChess
        //         </Link>
        //         <Link id="database-nav-link" to="/play">
        //             <svg
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 width="18"
        //                 height="18"
        //                 viewBox="0 0 24 24"
        //                 fill="none"
        //                 stroke="currentColor"
        //                 stroke-width="2"
        //                 stroke-linecap="round"
        //                 stroke-linejoin="round"
        //                 class="feather feather-layout mr-2"
        //             >
        //                 <rect
        //                     x="3"
        //                     y="3"
        //                     width="18"
        //                     height="18"
        //                     rx="2"
        //                     ry="2"
        //                 ></rect>
        //                 <line x1="3" y1="9" x2="21" y2="9"></line>
        //                 <line x1="9" y1="21" x2="9" y2="9"></line>
        //             </svg>
        //             &nbsp;Play Now
        //         </Link>
        //     </nav>
        // </header>
    }
}

export default Header;
