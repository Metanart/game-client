import { v4 } from 'uuid';

import {
    T_EventsContext,
    T_EventsEvent,
    T_EventsSubscriptions,
    T_EventsSubsribe,
} from './types';

export class CL_Events<
    TG_ContextId extends string,
    TG_EventId extends string,
    TG_CallbackPayload extends object,
> {
    private subscriptions: Partial<
        T_EventsSubscriptions<TG_ContextId, TG_EventId, TG_CallbackPayload>
    > = {};

    private getContext(
        eventContext: TG_ContextId,
    ): T_EventsContext<TG_EventId, TG_CallbackPayload> {
        if (this.subscriptions[eventContext] === undefined) {
            this.subscriptions[eventContext] = {};
        }

        return this.subscriptions[eventContext] as T_EventsContext<
            TG_EventId,
            TG_CallbackPayload
        >;
    }

    private getEvent(
        context: T_EventsContext<TG_EventId, TG_CallbackPayload>,
        eventId: TG_EventId,
    ): T_EventsEvent<TG_CallbackPayload> {
        if (context[eventId] === undefined) {
            context[eventId] = {};
        }

        return context[eventId] as T_EventsEvent<TG_CallbackPayload>;
    }

    subscribe(
        contextId: TG_ContextId,
        eventId: TG_EventId,
        callback: (payload: TG_CallbackPayload) => void,
        callbackId: string = v4(),
    ): T_EventsSubsribe {
        const context = this.getContext(contextId);
        const event = this.getEvent(context, eventId);

        event[callbackId] = callback;

        return {
            unsubscribe: () =>
                this.unsubscribe(
                    contextId,
                    eventId,
                    callbackId,
                    context,
                    event,
                ),
        };
    }

    unsubscribe(
        contextId: TG_ContextId,
        eventId: TG_EventId,
        callbackId: string,
        context: T_EventsContext<
            TG_EventId,
            TG_CallbackPayload
        > = this.getContext(contextId),
        event: T_EventsEvent<TG_CallbackPayload> = this.getEvent(
            context,
            eventId,
        ),
    ) {
        delete event[callbackId];

        if (Object.keys(event).length === 0) {
            delete context[eventId];
        }

        if (Object.keys(context).length === 0) {
            delete this.subscriptions[contextId];
        }
    }

    trigger(
        contextId: TG_ContextId,
        eventId: TG_EventId,
        callbackPayload: TG_CallbackPayload,
    ) {
        const event = this.subscriptions[contextId]?.[eventId];

        if (!event) return;

        Object.keys(event).forEach((callbackId) =>
            event[callbackId](callbackPayload),
        );
    }
}
