import React, { Component } from "react";
import { Roller } from "react-awesome-spinners";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="loading-screen">
                <Roller color="#000000" sizeUnit="px" />
                <p>Loading...</p>
                {/* <p className="loading-fade-in">
                    Perhaps this item doesn't exist
                </p> */}
            </div>
        );
    }
}

export default Loading;
