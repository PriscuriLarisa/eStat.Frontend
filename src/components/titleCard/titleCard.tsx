import { mainContainerClassname, titleClassname } from "./titleCard.styles"
import { ITitleCardProps } from "./titleCard.types"

export const TitleCard = (props: ITitleCardProps):JSX.Element => {
    return (<>
        <div className={mainContainerClassname}>
            <h1 className={titleClassname}>{props.title}</h1>
        </div>
    </>
    )
}