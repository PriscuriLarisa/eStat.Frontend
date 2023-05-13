import { mainContainerClassname, titleSmallClassname } from "./titleCard.styles"
import { ITitleCardProps } from "./titleCard.types"

export const TitleCardSmall = (props: ITitleCardProps):JSX.Element => {
    return (<>
        <div className={mainContainerClassname}>
            <h1 className={titleSmallClassname}>{props.title}</h1>
        </div>
    </>
    )
}