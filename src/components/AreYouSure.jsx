import React, { useState, useEffect } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const AreYouSure = ({ open, onClose, msg, fn1, fn2, label1, label2 }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            classNames={{
                modal: "customModal",
            }}
        >
            <h2>Are you sure?</h2>
            <p>{msg}</p>
            <div id="modal-btn-container">
                <button className="modal-btn" id="stay-btn" onClick={fn1}>
                    <span className="text">{label1 || "Stay"}</span>
                    <span className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                        </svg>
                    </span>
                </button>
                <button className="modal-btn" id="leave-btn" onClick={fn2}>
                    <span className="text">{label2 || "Leave"}</span>
                    <span className="icon">
                        <img src="/images/exit-icon.jpg" alt="" />
                    </span>
                </button>
            </div>
        </Modal>
    );
};

export default AreYouSure;
