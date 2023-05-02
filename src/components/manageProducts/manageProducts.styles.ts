import { mergeStyles } from "@fluentui/react";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
});

export const contentContainerClassname = mergeStyles({
    width: '100%',
    height: '86%',
    backgroundColor: '#fdfdfd',
    border: '2px solid #f0f0f0',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gridTemplateRows: '50% 50%'
});