import styles from "./ImageHoverFade.module.scss"

type ImageHoverParams = {
  img1: string;
  img2: string;
  fadeDuration: number;
  classNames?: string;
};

const ImageHoverFade = ({ img1, img2, fadeDuration, classNames }: ImageHoverParams) => {
  return (
    <div 
      className={`${styles.imgcontainer} ${classNames}`}
    >
      <img 
      className={styles.fadeImageBase}
        src={img1} 
        alt="" 
      />
      <img 
        src={img2} 
        alt="" 
        className={`${styles.fadeImageBase} ${styles.fadeImage}`}
        style={{ transitionDuration: `${fadeDuration}ms` }}
      />
    </div>
  );
};

export default ImageHoverFade;