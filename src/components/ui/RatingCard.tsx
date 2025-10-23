import type React from "react"
import styles from "./RatingCard.module.scss"

type RatingCardProps = {
    img: string,
    text: string,
    rating: number
}

const RatingCard: React.FC<RatingCardProps> = ({
    img,
    text,
    rating
}: RatingCardProps) => {

    return (
        <div className={styles.ratingContainer}>
            <img src={img} alt="" />
            <p>{text}</p>
            <div>
                <p>{rating}</p>
            </div>
        </div>
    )
}

export default RatingCard