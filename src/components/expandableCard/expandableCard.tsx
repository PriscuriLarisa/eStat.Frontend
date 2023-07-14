import { IIconProps, IconButton } from "office-ui-fabric-react";
import { TitleCardMedium } from "../titleCard/titleCardMedium";
import { mainContainerExpandedClassname, iconButtonStyles, titleContainerClassname, contentContainerExpandedClassname, contentContainerCollapsedClassname, headerContainer } from "./expandableCard.styles";
import { IExpandableCardProps } from "./expandableCard.types";
import { useState } from "react";
import { TitleCardSmall } from "../titleCard/titleCardSmall";

const expandedIcon: IIconProps = { iconName: "ChevronUpMed" };
const collapsedIcon: IIconProps = { iconName: "ChevronDownMed" };

export const ExpandableCard = (props: IExpandableCardProps): JSX.Element => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const onExpandButtonClicked = (): void => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className={mainContainerExpandedClassname}>
                <div style={{transition: '0.5s'}}>
                    <div className={titleContainerClassname} onClick={onExpandButtonClicked}>
                        <TitleCardMedium title={props.title} />
                        <IconButton iconProps={isExpanded ? expandedIcon : collapsedIcon} styles={iconButtonStyles} onClick={onExpandButtonClicked} />
                    </div>
                    {isExpanded && 
                    <div className={headerContainer}>
                        <TitleCardSmall title={props.subTitle} />
                    </div>
                    
                    }
                </div>

                <div className={isExpanded ? contentContainerExpandedClassname : contentContainerCollapsedClassname}>
                    {props.content}
                </div>
            </div>
        </>
    );
};