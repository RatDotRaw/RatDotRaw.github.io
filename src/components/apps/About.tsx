import type React from "react"
import styles from "./About.module.scss"

import LinkList from "../ui/LinkList"

const About: React.FC = () => {
  const links = [
    {
      href: "https://github.com/RatDotRaw/",
      text: "Github",
      subtext: "@RatDotRaw",
      icon: "/icons/github-mark-white.svg"
    },
    {
      href: "https://www.linkedin.com/in/staf-dierickx/",
      text: "LinkedIn",
      subtext: "@staf-dierickx",
      icon: "/icons/LI-In-Bug.png"
    }
  ] 


  return (
    <div className={styles.flex}>
      <img src="" alt="" />
      <div className={`${styles.subBox} ${styles.grid}`}>
        <img src="cropped.png" alt="" />
        <header>
          <p>Hi, this is</p>
          <h1>Staf Dierickx</h1>
        </header>
        <div style={{ gridArea: "body" }}>
          <p>I always like to learn new things!</p>
          <p>Bla bla bla...</p>
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

          {/* <ul>
            <li>
              <a href="">test</a>
            </li>
            <li>
              <a href="">test</a>
            </li>
            <li>
              <a href="">test</a>
            </li>
            <li>
              <a href="">test</a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  )
}

export default About
