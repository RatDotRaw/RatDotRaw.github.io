import type React from "react"
import styles from "./About.module.scss"
import ImageHoverFade from "../ui/ImageHoverFade"
import RatingCard from "../ui/RatingCard"
import LinkList from "../ui/LinkList"

const About: React.FC = () => {
  const links = [
    {
      href: "https://github.com/RatDotRaw/",
      text: "Github",
      subtext: "@RatDotRaw",
      icon: "/icons/logos/github-mark-white.svg"
    },
    {
      href: "https://www.linkedin.com/in/staf-dierickx/",
      text: "LinkedIn",
      subtext: "@staf-dierickx",
      icon: "/icons/logos/LI-In-Bug.png"
    },
    {
      href: "mailto:staf.dierickx@gmail.com",
      text: "e-mail",
      subtext: "staf.dierickx@gmail.com",
    }
  ] 

  return (
    <div className={styles.flex}>
      <div className={`${styles.subBox} ${styles.grid}`}>
        <ImageHoverFade img1="/cropped.png" img2="/cropped-cool.png" fadeDuration={5000} classNames="fill" />
        <header>
          <p>Hi, this is</p>
          <h1>Staf Dierickx</h1>
        </header>
        <div style={{ gridArea: "body" }}>
          <p>I'm an independent learner with a strong motivation to understand and apply technology and innovation.</p>
          <p>I have built up much of my knowledge myself and strengthened it through training.</p>
          <p>I often notice that I have already gone beyond the basics.</p>
          <p>I have a passion for design and programming and spend a lot of time on this.</p>
        </div>
      </div>
      <div>
        <h2>Skills</h2>
        <div
          className={styles.subBox}
        >
          <RatingCard img="/icons/logos/react.svg" text="react" rating={5} />
        </div>
      </div>
      <div>
        <h2>Links</h2>
        <div
          className={styles.subBox}
          style={{
            padding: 0,
          }}
        >
          <LinkList links={links}/>
        </div>
      </div>
      <div className={styles.footer}>
        <img src="/icons/logos/react.svg" alt="" />
        <p>Made using react by yours truly.</p>
        <p>Check out the source code on <a href="https://github.com/RatDotRaw/RatDotRaw.github.io/tree/react-new">Github</a></p>
      </div>
    </div>
  )
}

export default About
