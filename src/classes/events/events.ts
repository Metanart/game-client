import { v4 } from 'uuid';

import {
    TEventsContext,
    TEventsEvent,
    TEventsSubscriptions,
    TEventsSubsribe,
} from './types';

export class Events<
    TGContextId extends string,
    TGEventId extends string,
    TGCallbackPayload extends object,
> {
    private subscriptions: Partial<
        TEventsSubscriptions<TGContextId, TGEventId, TGCallbackPayload>
    > = {};

    private getContext(
        eventContext: TGContextId,
    ): TEventsContext<TGEventId, TGCallbackPayload> {
        if (this.subscriptions[eventContext] === undefined) {
            this.subscriptions[eventContext] = {};
        }

        return this.subscriptions[eventContext] as TEventsContext<
            TGEventId,
            TGCallbackPayload
        >;
    }

    private getEvent(
        context: TEventsContext<TGEventId, TGCallbackPayload>,
        eventId: TGEventId,
    ): TEventsEvent<TGCallbackPayload> {
        if (context[eventId] === undefined) {
            context[eventId] = {};
        }

        return context[eventId] as TEventsEvent<TGCallbackPayload>;
    }

    subscribe(
        contextId: TGContextId,
        eventId: TGEventId,
        callback: (payload: TGCallbackPayload) => void,
        callbackId: string = v4(),
    ): TEventsSubsribe {
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
        contextId: TGContextId,
        eventId: TGEventId,
        callbackId: string,
        context: TEventsContext<TGEventId, TGCallbackPayload> = this.getContext(
            contextId,
        ),
        event: TEventsEvent<TGCallbackPayload> = this.getEvent(
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
        contextId: TGContextId,
        eventId: TGEventId,
        callbackPayload: TGCallbackPayload,
    ) {
        const event = this.subscriptions[contextId]?.[eventId];

        if (!event) return;

        Object.keys(event).forEach((callbackId) =>
            event[callbackId](callbackPayload),
        );
    }
}
