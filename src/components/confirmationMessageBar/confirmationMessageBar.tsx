import { MessageBar, MessageBarButton, MessageBarType, ProgressIndicator } from "office-ui-fabric-react";
import { IConfirmationMessageBarProps } from "./confirmationMessageBar.types";
import { mainContainerClassname, messageBarButtonStyle, messageBarStyle, progressIndicatorClassname, progressIndicatorStyles } from "./confirmationMessageBar.styles";
import { useEffect, useState } from "react";

export const ConfirmationMessageBar = (props: IConfirmationMessageBarProps): JSX.Element => {
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const intervalIncrement: number = 0.02;
    const intervalDelay: number = 100;

    useEffect(() => {
        if(!displayMessage)
            return;

        if(intervalIncrement + percentComplete > 1)
        {
            setDisplayMessage(false);
            setPercentComplete(0);
            props.onMessageClosed();
            return;
        }
        const id = setInterval(() => {
            setPercentComplete((intervalIncrement + percentComplete) % 1);
        }, intervalDelay);
        return () => {
            clearInterval(id);
        };
    }, [percentComplete, displayMessage]);

    useEffect(() => {
        setDisplayMessage(props.display);
    }, [props.display])

    const onClose = (): void => {
        setDisplayMessage(false);
        props.onMessageClosed();
    }

    return (
        <>{displayMessage && 
            <div className={mainContainerClassname}>
                <MessageBar
                    dismissButtonAriaLabel="Close"
                    messageBarType={MessageBarType.success}
                    isMultiline={false}
                    styles={messageBarStyle}
                    onDismiss={onClose}
                >
                    {props.message}
                    
                </MessageBar>
                <ProgressIndicator percentComplete={percentComplete} styles={progressIndicatorStyles}/>
            </div>}
        </>
    );
};