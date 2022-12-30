import { v4 } from 'uuid';

import {
    TEvents,
    TEventsCallback,
    TEventsData,
    TEventsSubscriptions,
    TEventsSubscriptionsCategory,
    TEventsSubscriptionsEvent,
} from './types';

export class Events {
    private subscriptions: TEventsSubscriptions = {};

    private getCategory(eventCategory: string): TEventsSubscriptionsCategory {
        if (this.subscriptions[eventCategory] === undefined) {
            this.subscriptions[eventCategory] = {};
        }

        return this.subscriptions[eventCategory] as TEventsSubscriptionsCategory;
    }

    private getEvent(category: TEventsSubscriptionsCategory, eventsName: TEvents): TEventsSubscriptionsEvent {
        if (category[eventsName] === undefined) {
            category[eventsName] = {};
        }

        return category[eventsName] as TEventsSubscriptionsEvent;
    }

    subscribe(eventsCategory: string, eventsName: TEvents, callback: TEventsCallback) {
        const eventId: string = v4();
        const subscriptionsCategory = this.getCategory(eventsCategory);
        const subscriptionsEvent = this.getEvent(subscriptionsCategory, eventsName);

        subscriptionsEvent[eventId] = callback;

        return {
            eventsCategory,
            eventsName: eventsName,
            eventId: eventId,
            unsubscribe: () => {
                delete subscriptionsEvent[eventId];
                if (Object.keys(subscriptionsEvent).length === 0) delete subscriptionsCategory[eventsName];
                if (Object.keys(subscriptionsCategory).length === 0) delete this.subscriptions[eventsCategory];
            },
        };
    }

    trigger(eventsCategory: string, eventsName: TEvents, data: TEventsData) {
        const subscriptionsEvent: TEventsSubscriptionsEvent | undefined =
            this.subscriptions[eventsCategory]?.[eventsName];

        if (!subscriptionsEvent) return;

        Object.keys(subscriptionsEvent).forEach((key) => subscriptionsEvent[key](data));
    }
}
