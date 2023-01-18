export type TEventsEventId = string;

export type TEventsData = any;

export type TEventsSubscriptions<
    TGContextKey extends string,
    TGEventKey extends string,
> = {
    [Key in TGContextKey]: TEventsContext<TGEventKey>;
};

export type TEventsContext<TGEventKey extends string> = {
    [Key in TGEventKey]?: TEventsEvent;
};

export type TEventsEvent = {
    [Key in TEventsEventId]: TEventsCallback;
};

export type TEventsCallback = (data?: TEventsData) => void;

export type TEventsSubsribe = {
    unsubscribe: () => void;
};
