import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const AreYouSure = ({ open, onClose, fn }) => {
    return (
        <Modal open={open} onClose={onClose} className="are-you-sure-modal">
            <h2>Simple centered modal</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
            </p>
            {/* <button onClick={runCallback}>Yes</button> */}
        </Modal>
    );
};

export default AreYouSure;
