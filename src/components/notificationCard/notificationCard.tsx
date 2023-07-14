import { Link, Text } from "@fluentui/react";
import { dateClassName, mainContainerClassname, textClassname, timeClassName } from "./notificationCard.styles";
import { INotificationCardProps } from "./notificationCard.types";
import { TitleCardSmall } from "../titleCard/titleCardSmall";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const NotificationCard = (props: INotificationCardProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className={mainContainerClassname}>
            <TitleCardSmall title={props.notification.title} />
            <Text className={textClassname}>
                <div className={dateClassName}>
                    {new Date(props.notification.date).toDateString()}
                </div>
                <div className={timeClassName}>
                    {`${new Date(props.notification.date).getHours()}:${new Date(props.notification.date).getMinutes()}`}
                </div>
                {props.notification.text}
                <br></br>
                <Link onClick={() => {navigate(props.notification.hyperlink); props.closePanel();}}>{props.notification.hyperlinkText}</Link>
            </Text>

        </div>
    );
};