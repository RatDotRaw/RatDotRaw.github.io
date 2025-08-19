import React, { useState } from "react";

const TallyCounter: React.FC = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const reset = () => setCount(0);

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
            }}
        >
            <h2>Tally Counter</h2>
            <div style={{ fontSize: "48px", margin: "20px 0" }}>{count}</div>
            <div>
                <button
                    onClick={increment}
                    style={{
                        fontSize: "18px",
                        padding: "10px 20px",
                        margin: "5px",
                        cursor: "pointer",
                    }}
                >
                    Count
                </button>
                <button
                    onClick={reset}
                    style={{
                        fontSize: "18px",
                        padding: "10px 20px",
                        margin: "5px",
                        cursor: "pointer",
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TallyCounter;
