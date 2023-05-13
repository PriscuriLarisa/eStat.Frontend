import { mergeStyles } from "@fluentui/react";
import { FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
    position: 'relative'
});

export const titleClassname = mergeStyles({
    color: "#53525c",
    fontFamily: FONT_FAMILY,
});

export const titleSmallClassname = mergeStyles({
    color: "#53525c",
    fontFamily: FONT_FAMILY,
    fontSize: '18px'
});

export const titleMediumClassname = mergeStyles({
    color: "#53525c",
    fontFamily: FONT_FAMILY,
    fontSize: '22px',
    margin: '0.5%'
});