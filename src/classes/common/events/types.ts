export type T_EventsSubscriptions<
    TG_ContextId extends string,
    TG_EventId extends string,
    TG_CallbackPayload extends object,
> = {
    [Key in TG_ContextId]: T_EventsContext<TG_EventId, TG_CallbackPayload>;
};

export type T_EventsContext<TG_EventId extends string, TG_CallbackPayload> = {
    [Key in TG_EventId]?: T_EventsEvent<TG_CallbackPayload>;
};

export type T_EventsEvent<TG_CallbackPayload> = {
    [Key in string]: T_EventsCallback<TG_CallbackPayload>;
};

export type T_EventsCallback<TG_CallbackPayload> = (
    payload: TG_CallbackPayload,
) => void;

export type T_EventsSubsribe = {
    unsubscribe: () => void;
};
