import {
    T_EventsContext,
    T_EventsEvent,
    T_EventsSubscriptions,
    T_EventsSubsribe,
} from './types';

import { v4 } from 'uuid';

export class CL_Events<
    GT_ContextId extends string,
    GT_EventId extends string,
    GT_CallbackPayload extends object,
> {
    private subscriptions: Partial<
        T_EventsSubscriptions<GT_ContextId, GT_EventId, GT_CallbackPayload>
    > = {};

    private getContext(
        eventContext: GT_ContextId,
    ): T_EventsContext<GT_EventId, GT_CallbackPayload> {
        if (this.subscriptions[eventContext] === undefined) {
            this.subscriptions[eventContext] = {};
        }

        return this.subscriptions[eventContext] as T_EventsContext<
            GT_EventId,
            GT_CallbackPayload
        >;
    }

    private getEvent(
        context: T_EventsContext<GT_EventId, GT_CallbackPayload>,
        eventId: GT_EventId,
    ): T_EventsEvent<GT_CallbackPayload> {
        if (context[eventId] === undefined) {
            context[eventId] = {};
        }

        return context[eventId] as T_EventsEvent<GT_CallbackPayload>;
    }

    subscribe(
        contextId: GT_ContextId,
        eventId: GT_EventId,
        callback: (payload: GT_CallbackPayload) => void,
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
        contextId: GT_ContextId,
        eventId: GT_EventId,
        callbackId: string,
        context: T_EventsContext<
            GT_EventId,
            GT_CallbackPayload
        > = this.getContext(contextId),
        event: T_EventsEvent<GT_CallbackPayload> = this.getEvent(
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
        contextId: GT_ContextId,
        eventId: GT_EventId,
        callbackPayload: GT_CallbackPayload,
    ) {
        const event = this.subscriptions[contextId]?.[eventId];

        if (!event) return;

        Object.keys(event).forEach((callbackId) =>
            event[callbackId](callbackPayload),
        );
    }
}
