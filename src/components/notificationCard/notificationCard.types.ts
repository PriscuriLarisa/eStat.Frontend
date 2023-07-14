import { Notification } from "../../models/Notification";

export interface INotificationCardProps {
    notification: Notification,
    closePanel: () => void 
}