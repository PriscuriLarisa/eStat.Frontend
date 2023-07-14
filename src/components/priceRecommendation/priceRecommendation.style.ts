import { mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box'
});

export const headerContainerClassname = mergeStyles({
    width: '100%',
    height: '40%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    display: 'flex'
});

export const titleContainerClassname = mergeStyles({
    width: '60%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
});

export const additionalInfoContainer = mergeStyles({
    width: '100%',
    height: '60%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    display: 'flex',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '4px'
});

export const priceContainerClassname = mergeStyles({
    width: '40%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    display: 'flex',
    padding: '3%'
});

export const priceChangeContainer = mergeStyles({
    width: '60%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    textAlign: 'center',
    borderLeft: `2px solid ${BORDER_COLOR}`,
    paddingTop: '4%'
});

export const infoColumnOne = mergeStyles({
    width: '33%',
    height: '100%',
});

export const infoColumnTwo = mergeStyles({
    width: '500px',
    height: '500px',
});


export const priceChangeInfoContainer = mergeStyles({
    width: '40%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    textAlign: 'center',
    display: 'flex'
});

export const textClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '26px',
    fontWeight: '600'
});

export const textSmallClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '17px',
    fontWeight: '300'
});

export const textImportantClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '28px',
    fontWeight: '600',
    color: '#4B56D2',
    margin: 'auto',
    textDecoration: 'underline'
});

export const textDownClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '28px',
    fontWeight: '600',
    color: '#9e1313',
    margin: 'auto',
    position: 'relative',
    right: '5%',
    top: '1.5%'
});

export const textUpClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '28px',
    fontWeight: '600',
    color: '#069149',
    margin: 'auto',
    position: 'relative',
    right: '5%',
    top: '1.5%'
});

export const arrowIconClassname: string = mergeStyles({
    color: '#472183',
    fontSize: '26px',
    textAlign: 'center',
    position: 'relative',
    margin: 'auto',
    marginTop: '7%',
    marginBottom: '7%',
});

export const priceDownIconClassname: string = mergeStyles({
    color: '#9e1313',
    fontSize: '40px',
    textAlign: 'center',
    position: 'relative',
    margin: 'auto',
    fontWeight: '600',
});

export const priceUpIconClassname: string = mergeStyles({
    color: '#069149',
    fontSize: '40px',
    textAlign: 'center',
    position: 'relative',
    margin: 'auto',
    fontWeight: '600',
});