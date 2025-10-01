import styles from "./LinkList.module.scss";

export type LinkItem = {
  href: string
  text: string
  subtext?: string
  icon?: string // url to img source
}

export type LinkListProps = {
  links: LinkItem[]
}

function LinkList({ links }: LinkListProps) {
  return (
    <div className={styles.linkList}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
        >
            {link.icon && <img src={link.icon} alt="" />}
            <p className={styles.bold}>{link.text}</p>
            {link.subtext && (
                <p className="text-sm opacity-80">{link.subtext}</p>
            )}
        </a>
      ))}
    </div>
  )
}

export default LinkList
