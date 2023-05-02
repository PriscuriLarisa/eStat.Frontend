import { mergeStyles } from "@fluentui/react";
import { FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '8%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
});

export const titleClassname = mergeStyles({
    color: "#53525c",
    fontFamily: FONT_FAMILY
});