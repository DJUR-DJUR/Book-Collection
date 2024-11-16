export interface NotificationData {
    message: string;
    style: MessageStyle
    duration?: number;
}

export enum MessageStyle {
    Success = 'success',
    Neutral = 'neutral',
    Error = 'error',
}
