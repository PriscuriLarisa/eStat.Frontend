import { mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname: string = mergeStyles({
    marginTop: '3vh',
    width: '95%',
    maxHeight: '20vh',
    position:'relative',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '4px',
    boxSizing: 'border-box',
    padding: '0% 3% 3% 3%'
});

export const textClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY
});

export const dateClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    textAlign: 'right',
    position: 'absolute',
    top: '2vh',
    right: '3%',
    color: '#472183'
});

export const timeClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    textAlign: 'right',
    position: 'absolute',
    top: '4.5vh',
    right: '3%',
    color: '#472183'
});