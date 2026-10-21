import { useEffect, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";
import styles from "./TopPanel.module.scss";

const TopBar: FunctionComponent = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            // get date
            const weekday = now.toLocaleDateString(navigator.language || "en-us", { weekday: 'long' });

            setTime(`${hours}:${minutes}:${seconds} ${weekday} ${now.getDate()}/${now.getMonth() +1}`);
        };

        updateTime(); // initialize immediately
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <div className={styles.topPanel}>
            <div></div>
            <div
                style={{
                    "display": "flex",
                    "justify-content": "center",
                }}
            >{time}</div>
            <div></div>
        </div>
    );
};

export default TopBar;
