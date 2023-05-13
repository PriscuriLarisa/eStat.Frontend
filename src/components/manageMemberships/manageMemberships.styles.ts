import { mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '99%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px'
});
export const membershipInfoContainerClasssname = mergeStyles({
    width: '100%',
    height: '90%',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    display: 'flex',
    padding: '2% 5%'
});