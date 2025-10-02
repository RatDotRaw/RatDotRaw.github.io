import React from "react";

const HelloWorld: React.FC = () => {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Hello World!</h2>
            <p>This is a simple Hello World application.</p>
            <p>Did you know: this was the first "application" on the website to text the floating window features!</p>

            <p>You can:</p>
            <p>- Drag windows around.</p>
            <p>- Resize windows</p>
            <p>- Open multiple unique instances of windows</p>
            <p>- Minimize and close windows</p>
        </div>
    );
};

export default HelloWorld;
