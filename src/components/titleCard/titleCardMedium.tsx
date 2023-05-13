import { mainContainerClassname, titleMediumClassname, titleSmallClassname } from "./titleCard.styles"
import { ITitleCardProps } from "./titleCard.types"

export const TitleCardMedium = (props: ITitleCardProps):JSX.Element => {
    return (<>
        <div className={mainContainerClassname}>
            <h1 className={titleMediumClassname}>{props.title}</h1>
        </div>
    </>
    )
}