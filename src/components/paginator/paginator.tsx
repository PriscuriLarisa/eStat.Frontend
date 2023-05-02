import { useState } from "react";
import { iconButtonStyles, labelClassName, mainContainerClassname } from "./paginator.styles";
import { firstIcon, lastIcon, leftIcon, rightIcon } from "./paginator.items";
import { IconButton, Label } from "@fluentui/react";
import { IPaginatorProps } from "./paginator.types";

export const Paginator = (props: IPaginatorProps): JSX.Element => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [firstButtonDisabled, setFirstButtonDisabled] = useState<boolean>(true);
    const [leftButtonDisabled, setLeftButtonDisabled] = useState<boolean>(true);
    const [rightButtonDisabled, setRightButtonDisabled] = useState<boolean>(false);
    const [lastButtonDisabled, setLastButtonDisabled] = useState<boolean>(false);

    const onLeftClick = (): void => {
        setPageNumber(pageNumber-1);
        if(pageNumber-1 === 1)
        {
            setLeftButtonDisabled(true);
            setFirstButtonDisabled(true);
        }
        if(rightButtonDisabled)
            setRightButtonDisabled(false);
        if(lastButtonDisabled)
            setLastButtonDisabled(false);

        props.updatePageNumber(pageNumber-1)
    }

    const onRightClick = (): void => {
        setPageNumber(pageNumber+1);
        if(pageNumber+1 === props.maxNumberOfPages)
        {
            setRightButtonDisabled(true);
            setLastButtonDisabled(true);
        }
        if(leftButtonDisabled)
            setLeftButtonDisabled(false);
        if(firstButtonDisabled)
            setFirstButtonDisabled(false);

        props.updatePageNumber(pageNumber+1)
    }

    const onLastClick = (): void => {
        setPageNumber(props.maxNumberOfPages);
        setRightButtonDisabled(true);
        setLastButtonDisabled(true);
        if(leftButtonDisabled)
            setLeftButtonDisabled(false);
        if(firstButtonDisabled)
            setFirstButtonDisabled(false);

        props.updatePageNumber(props.maxNumberOfPages)
    }

    const onFirstClick = (): void => {
        setPageNumber(1);
        setLeftButtonDisabled(true);
        setFirstButtonDisabled(true);
        if(rightButtonDisabled)
            setRightButtonDisabled(false);
        if(lastButtonDisabled)
            setLastButtonDisabled(false);

        props.updatePageNumber(1)
    }

    return (
        <div className={mainContainerClassname}>
             <IconButton iconProps={firstIcon} styles={iconButtonStyles} onClick={onFirstClick} disabled={firstButtonDisabled}/>
             <IconButton iconProps={leftIcon} styles={iconButtonStyles} onClick={onLeftClick} disabled={leftButtonDisabled}/>
             <label className={labelClassName}>{pageNumber}</label>
             <IconButton iconProps={rightIcon} styles={iconButtonStyles} onClick={onRightClick} disabled={rightButtonDisabled}/>
             <IconButton iconProps={lastIcon} styles={iconButtonStyles} onClick={onLastClick} disabled={lastButtonDisabled}/>
        </div>
    )
};