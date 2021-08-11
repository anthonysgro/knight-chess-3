import React, { Component } from "react";

// React Redux imports
import { connect } from "react-redux";
import {
    toggleSidebar,
    setAutoRotate,
    resign,
    editUnderpromotion,
    sendChat,
} from "../../store/actions";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatbox: "",
            messages: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.messages.length !== this.props.messages.length) {
            this.setState({
                messages: this.props.messages,
            });
        }
    }

    handleChange(ev) {
        this.setState({ chatbox: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const msg = this.state.chatbox.trim();
        if (msg.length > 0) {
            this.props.sendChat(this.props.gamecode, this.state.chatbox);
            this.setState({ chatbox: "" });
        }
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
                            {this.state.messages.map(({ msg, sender }, i) => (
                                <div className="message" key={i}>
                                    <p className="internal-msg">
                                        <span className="chat-name">
                                            {sender === window.socket.id
                                                ? "You"
                                                : "Them"}
                                            :{" "}
                                        </span>
                                        <span className="chat-msg">{msg}</span>
                                    </p>

                                    {/* <p
                                            className="internal-msg"
                                            style={{ textAlign: "right" }}
                                        >
                                            <span className="chat-msg">
                                                {msg}
                                            </span>
                                            {/* <span className="chat-name">
                                                {" "}
                                                :Them
                                            </span>
                                            </p> */}
                                </div>
                            ))}
                            {/* <div className="message">
                                <p className="internal-msg">
                                    <span className="chat-name">
                                        Username:{" "}
                                    </span>
                                    <span className="chat-msg">
                                        Text goes here!
                                    </span>
                                </p>
                            </div> */}
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
                                    value={this.state.chatbox}
                                    onChange={this.handleChange}
                                ></textarea>
                                <button
                                    className="redbtn"
                                    id="submit-msg"
                                    onClick={this.handleSubmit}
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
        messages: state.ui.messages,
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
        sendChat: (gamecode, msg) => dispatch(sendChat(gamecode, msg)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
