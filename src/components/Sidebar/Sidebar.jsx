import React, { Component } from "react";

// React Redux imports
import { connect } from "react-redux";
import {
    toggleSidebar,
    setAutoRotate,
    resign,
    editUnderpromotion,
} from "../../store/actions";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.sendChat = this.sendChat.bind(this);
    }

    sendChat(ev) {
        ev.preventDefault();
    }

    render() {
        const {
            sidebarOpen,
            gamecode,
            toggleSidebar,
            thisPlayerWhite,
            underpromotion,
        } = this.props;
        const { onlineMultiplayer, localMultiplayer } = this.props.gameModes;
        const sidebarClassList = sidebarOpen ? "sidebar show" : "sidebar";

        return (
            <div id="sidebar" className={sidebarClassList}>
                <button
                    className="redbtn"
                    style={{
                        fontSize: "35%",
                        boxShadow: "none",
                        padding: ".1rem .4rem",
                    }}
                    onClick={toggleSidebar}
                >
                    Close
                </button>
                {onlineMultiplayer ? (
                    <div className="settings-container" id="chat-container">
                        {/* <h2 id="chat-title">Chat</h2> */}
                        <label
                            htmlFor="chat"
                            id="chat-label"
                            className="sidebar-label"
                        >
                            Chat
                        </label>
                        <div className="chat-element" id="chat-history">
                            <div className="message">
                                <p className="internal-msg">
                                    <span className="chat-name">
                                        Username:{" "}
                                    </span>
                                    <span className="chat-msg">
                                        Text goes here!
                                    </span>
                                </p>
                            </div>
                        </div>
                        <form
                            action="#"
                            className="chat-element"
                            id="chat-form"
                        >
                            <div className="chat-element" id="msg-container">
                                <textarea
                                    name="msg"
                                    id="msg"
                                    cols="60"
                                    rows="1"
                                    placeholder="Type message..."
                                ></textarea>
                                <button
                                    className="redbtn"
                                    id="submit-msg"
                                    onClick={this.sendChat}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}

                <div className="settings-container" id="endGame-btn-container">
                    <label
                        htmlFor="underpromotion"
                        id="endgame-label"
                        className="sidebar-label"
                    >
                        End Game Options:
                    </label>
                    <div id="btn-container">
                        {/* {onlineMultiplayer ? (
                            <button
                                className="redbtn"
                                id="submit-draw"
                                // onClick={() => this.props.offerDraw(event)}
                            >
                                Offer Draw
                            </button>
                        ) : (
                            ""
                        )} */}
                        <button
                            className="redbtn"
                            id="submit-resign"
                            onClick={() =>
                                this.props.resign(
                                    gamecode,
                                    onlineMultiplayer,
                                    thisPlayerWhite,
                                )
                            }
                        >
                            Resign
                        </button>
                    </div>
                </div>
                <div
                    className="settings-container"
                    id="underpromotion-container"
                >
                    {" "}
                    <label
                        htmlFor="underpromotion"
                        id="promolabel"
                        className="sidebar-label"
                    >
                        Advanced Promotion:
                    </label>
                    <select
                        name="underpromotion"
                        id="underpromotion"
                        defaultValue={underpromotion}
                        onChange={this.props.editUnderpromotion}
                    >
                        <option value="Q">Queen</option>
                        <option value="N">Knight</option>
                        <option value="R">Rook</option>
                        <option value="B">Bishop</option>
                    </select>
                </div>
                {onlineMultiplayer ? (
                    <div
                        className="settings-container"
                        id="endGame-btn-container"
                    >
                        <label
                            htmlFor="gamecode"
                            id="gamecode-label"
                            className="sidebar-label"
                            style={{ marginBottom: ".5rem" }}
                        >
                            Game code:
                        </label>
                        <p style={{ fontSize: "80%", margin: "0" }}>
                            {gamecode}
                        </p>
                    </div>
                ) : localMultiplayer ? (
                    <div
                        className="settings-container"
                        id="endGame-btn-container"
                    >
                        <label
                            htmlFor="auto-rotate"
                            id="autorotate-label"
                            className="sidebar-label"
                            style={{ marginBottom: ".5rem" }}
                        >
                            Auto-Rotate
                        </label>
                        <input
                            type="checkbox"
                            id="auto-rotate"
                            name="auto-rotate"
                            checked={this.props.autoRotate}
                            onChange={this.props.setAutoRotate}
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sidebarOpen: state.ui.sidebarOpen,
        gamecode: state.gameInfo.gameCode,
        gameModes: state.gameModes,
        autoRotate: state.ui.autoRotate,
        thisPlayerWhite: state.gameInfo.thisPlayerWhite,
        underpromotion: state.gameInfo.underpromotion,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSidebar: () => dispatch(toggleSidebar()),
        setAutoRotate: () => dispatch(setAutoRotate()),
        resign: (gameCode, online, thisPlayerWhite) =>
            dispatch(resign(gameCode, online, thisPlayerWhite)),
        editUnderpromotion: (ev, underpromotion) =>
            dispatch(editUnderpromotion(ev, underpromotion)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
