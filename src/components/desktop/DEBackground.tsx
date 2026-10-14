import type { FunctionComponent } from "preact";
import styles from "./DEBackground.module.scss";

const DEBackground: FunctionComponent = () => {
  return (
    <>
      <div className={styles.backgroundWaves}>
        <div className={styles.wrapper}>
          <div className={styles.wave}></div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wave}></div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wave}></div>
        </div>
      </div>
    </>
  );
};

export default DEBackground;
