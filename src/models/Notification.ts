export interface Notification {
    notificationGuid: string,
    title: string;
    text: string;
    hyperlink: string,
    hyperlinkText: string,
    date: Date,
    read: boolean
};