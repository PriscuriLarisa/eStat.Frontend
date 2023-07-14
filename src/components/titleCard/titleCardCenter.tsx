import { mainContainerClassname, titleCenterClassname, titleCenterMainClassname, titleSmallClassname } from "./titleCard.styles"
import { ITitleCardProps } from "./titleCard.types"

export const TitleCardCenter = (props: ITitleCardProps):JSX.Element => {
    return (<>
        <div className={titleCenterMainClassname}>
            <h1 className={titleCenterClassname}>{props.title}</h1>
        </div>
    </>
    )
}