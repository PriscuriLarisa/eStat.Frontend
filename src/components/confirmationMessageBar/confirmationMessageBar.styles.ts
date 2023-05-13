import { IMessageBarStyles } from "@fluentui/react";
import { FONT_FAMILY} from "../../library/constants";
import { IProgressIndicatorStyles, mergeStyles } from "office-ui-fabric-react";

export const mainContainerClassname: string = mergeStyles({
    position: 'absolute',
    height: 'auto',
    width: 'auto',
    right: '1%',
    top: '2%',
    backgroundColor: '#4B56D2'
});

export const progressIndicatorClassname: string = mergeStyles({
    padding: '0px'
});

export const progressIndicatorStyles: Partial<IProgressIndicatorStyles> = {
    root: {
        padding: '0px',
    },
    itemProgress: {
        padding: '0px',
    },
    progressBar: {
        backgroundColor: '#472183',
    }
}

export const messageBarStyle: Partial<IMessageBarStyles> = {
    root: {
        width: 'fit-content',
        height: '34px',
        backgroundColor: '#4B56D2',
        fontFamily: FONT_FAMILY
    },
    text: {
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        color: '#fdfdfd',
    },
    icon: {
        color: '#fdfdfd',
    },
    dismissal: {
        color: '#fdfdfd',
        selectors: {
            '.ms-Icon': {
                color: '#fdfdfd',
            }
        }
    },
};

export const messageBarButtonStyle = mergeStyles({
    border: 'none',
    fontFamily: FONT_FAMILY,
    backgroundColor: 'transparent',
    color: '#fdfdfd',
    selectors: {
        ':hover' : {
            fontFamily: FONT_FAMILY,
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            color: '#fdfdfd',
        },
        ':focus' : {
            fontFamily: FONT_FAMILY,
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            color: '#fdfdfd',
        }
    }
});