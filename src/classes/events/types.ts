export type TEventsData = any;

export type TEventsCategory = 'SettingsControls';

export type TEvents = string;

export type TEventsSubscriptions = {
    [Key: string]: TEventsSubscriptionsCategory;
};

export type TEventsSubscriptionsCategory = {
    [Key in TEvents]?: TEventsSubscriptionsEvent;
};

export type TEventsSubscriptionsEvent = { [Key: string]: TEventsCallback };

export type TEventsCallback = (data: TEventsData) => void;

export type TEventsUnsubscribe = {
    eventsCategory: TEventsCategory;
    eventsName: TEvents;
    eventId: string;
    unsubscribe: Function;
};
