import React, { Component } from "react";

// React Redux imports
import { connect } from "react-redux";

class Sidebar extends Component {
    constructor() {
        super();
        this.sendChat = this.sendChat.bind(this);
    }

    sendChat(ev) {
        ev.preventDefault();
    }

    render() {
        const { sidebarOpen, gamecode } = this.props;
        const sidebarClassList = sidebarOpen ? "sidebar show" : "sidebar";

        return (
            <div id="sidebar" className={sidebarClassList}>
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
                                <span className="chat-name">Username: </span>
                                <span className="chat-msg">
                                    Text goes here!
                                </span>
                            </p>
                        </div>
                    </div>
                    <form action="#" className="chat-element" id="chat-form">
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
                <div className="settings-container" id="endGame-btn-container">
                    <label
                        htmlFor="underpromotion"
                        id="endgame-label"
                        className="sidebar-label"
                    >
                        End Game Options:
                    </label>
                    <div id="btn-container">
                        <button
                            className="redbtn"
                            id="submit-draw"
                            // onClick={() => this.props.offerDraw(event)}
                        >
                            Offer Draw
                        </button>
                        <button
                            className="redbtn"
                            id="submit-resign"
                            // onClick={() => this.props.resign(event)}
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
                        // onChange={() => changePromotion(event)}
                    >
                        <option value="Q">Queen</option>
                        <option value="N">Knight</option>
                        <option value="R">Rook</option>
                        <option value="B">Bishop</option>
                    </select>
                </div>
                <div className="settings-container" id="endGame-btn-container">
                    <label
                        htmlFor="gamecode"
                        id="gamecode-label"
                        className="sidebar-label"
                        style={{ marginBottom: ".5rem" }}
                    >
                        Game code:
                    </label>
                    <p style={{ fontSize: "80%", margin: "0" }}>{gamecode}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sidebarOpen: state.ui.sidebarOpen,
        gamecode: state.boardState.gameCode,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
