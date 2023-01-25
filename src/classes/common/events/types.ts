export type T_EventsSubscriptions<
    GT_ContextId extends string,
    GT_EventId extends string,
    GT_CallbackPayload extends object,
> = {
    [Key in GT_ContextId]: T_EventsContext<GT_EventId, GT_CallbackPayload>;
};

export type T_EventsContext<GT_EventId extends string, GT_CallbackPayload> = {
    [Key in GT_EventId]?: T_EventsEvent<GT_CallbackPayload>;
};

export type T_EventsEvent<GT_CallbackPayload> = {
    [Key in string]: T_EventsCallback<GT_CallbackPayload>;
};

export type T_EventsCallback<GT_CallbackPayload> = (
    payload: GT_CallbackPayload,
) => void;

export type T_EventsSubsribe = {
    unsubscribe: () => void;
};
