import { List } from './list';

type TCollectionItemProps = 'id' | 'ownerId';

export type TCollectionItem = {
    [Key in TCollectionItemProps]: any;
};

export class Collection<TGItem extends TCollectionItem> extends List<TGItem> {
    getItemByProperty(
        propertyValue: string | number,
        propertyName: TCollectionItemProps,
    ): TGItem | undefined {
        const itemIndex = this.getItemIndexByProperty(
            propertyValue,
            propertyName,
        );
        return itemIndex >= 0 ? this.list[itemIndex] : undefined;
    }

    getItemIndexByProperty(
        propertyValue: string | number,
        propertyName: TCollectionItemProps,
    ): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex(
            (item) => item[propertyName] === propertyValue,
        );
    }

    removeItemByProperty(
        propertyValue: string | number,
        propertyName: TCollectionItemProps,
    ): TGItem | undefined {
        const itemIndex = this.getItemIndexByProperty(
            propertyValue,
            propertyName,
        );
        return itemIndex >= 0 ? this.removeItemByIndex(itemIndex) : undefined;
    }

    override getItemIndex(
        requestedItem: TGItem,
        propertyName?: TCollectionItemProps,
    ): number {
        if (this.list.length === 0) return -1;

        if (propertyName)
            return this.getItemIndexByProperty(
                requestedItem[propertyName],
                propertyName,
            );

        return this.getItemIndexByProperty(requestedItem.id, 'id');
    }
}
