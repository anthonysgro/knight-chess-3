import React, { useState, useEffect } from "react";

const AboutPage = () => {
    return (
        <div id="about-page">
            <h2 className="create-join-title">About the Developer</h2>
            <p style={{ color: "#151930" }}>
                Hi! It's Anthony. I made KnightChess as a way to easily play
                chess online with a sleek design. If you have any questions or
                bug reports, you can find my email on{" "}
                <span>
                    <a
                        href="https://anthony-sgro.com"
                        target="_blank"
                        class="about-us-link"
                    >
                        my website
                    </a>
                </span>
                .
            </p>
        </div>
    );
};

export default AboutPage;
