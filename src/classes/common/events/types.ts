export type TEventsSubscriptions<
    TGContextId extends string,
    TGEventId extends string,
    TGCallbackPayload extends object,
> = {
    [Key in TGContextId]: TEventsContext<TGEventId, TGCallbackPayload>;
};

export type TEventsContext<TGEventId extends string, TGCallbackPayload> = {
    [Key in TGEventId]?: TEventsEvent<TGCallbackPayload>;
};

export type TEventsEvent<TGCallbackPayload> = {
    [Key in string]: TEventsCallback<TGCallbackPayload>;
};

export type TEventsCallback<TGCallbackPayload> = (
    payload: TGCallbackPayload,
) => void;

export type TEventsSubsribe = {
    unsubscribe: () => void;
};
