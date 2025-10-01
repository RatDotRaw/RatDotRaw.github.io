import { useEffect, useState } from "react";
import styles from "./TopPanel.module.scss";

const TopBar: React.FC = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        updateTime(); // initialize immediately
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <div className={styles.topPanel}>
            <div></div>
            <div>{time}</div>
            <div></div>
        </div>
    );
};

export default TopBar;
