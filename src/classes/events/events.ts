import { v4 } from 'uuid';

import {
    TEventsCallback,
    TEventsContext,
    TEventsData,
    TEventsEvent,
    TEventsEventId,
    TEventsSubscriptions,
    TEventsSubsribe,
} from './types';

export class Events<
    TGContextKey extends string,
    TGEventKey extends string,
    TGCallbackPayload extends {},
> {
    private subscriptions: Partial<
        TEventsSubscriptions<TGContextKey, TGEventKey>
    > = {};

    private getContext(eventContext: TGContextKey): TEventsContext<TGEventKey> {
        if (this.subscriptions[eventContext] === undefined) {
            this.subscriptions[eventContext] = {};
        }

        return this.subscriptions[eventContext] as TEventsContext<TGEventKey>;
    }

    private getEvent(
        context: TEventsContext<TGEventKey>,
        eventKey: TGEventKey,
    ): TEventsEvent {
        if (context[eventKey] === undefined) {
            context[eventKey] = {};
        }

        return context[eventKey] as TEventsEvent;
    }

    subscribe(
        contextKey: TGContextKey,
        eventKey: TGEventKey,
        callback: TEventsCallback,
    ): TEventsSubsribe {
        const callbackId: TEventsEventId = v4();
        const context = this.getContext(contextKey);
        const event = this.getEvent(context, eventKey);

        event[callbackId] = callback;

        return {
            unsubscribe: () => {
                delete event[callbackId];

                if (Object.keys(event).length === 0) {
                    delete context[eventKey];
                }

                if (Object.keys(context).length === 0) {
                    delete this.subscriptions[contextKey];
                }
            },
        };
    }

    trigger(
        contextKey: TGContextKey,
        eventKey: TGEventKey,
        payload: TGCallbackPayload,
    ) {
        const event = this.subscriptions[contextKey]?.[eventKey];

        if (!event) return;

        Object.keys(event).forEach((callbackId) => event[callbackId](payload));
    }
}
