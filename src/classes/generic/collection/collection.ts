import { CL_List } from '../list/list';

type T_CollectionItemProps = 'id' | 'ownerId' | string | number | symbol;

export type T_CollectionItem = {
    [Key in T_CollectionItemProps]: any;
};

export class CL_Collection<
    GT_Item extends T_CollectionItem,
> extends CL_List<GT_Item> {
    getItemByProperty(
        propertyValue: string | number,
        propertyName: keyof GT_Item = 'id',
    ): GT_Item | undefined {
        const itemIndex = this.getItemIndexByProperty(
            propertyValue,
            propertyName,
        );
        return itemIndex >= 0 ? this.items[itemIndex] : undefined;
    }

    getItemIndexByProperty(
        propertyValue: string | number,
        propertyName: T_CollectionItemProps,
    ): number {
        return this.items.findIndex(
            (item) => item[propertyName] === propertyValue,
        );
    }

    removeItemByProperty(
        propertyValue: string | number,
        propertyName: T_CollectionItemProps = 'id',
    ): GT_Item | undefined {
        const itemIndex = this.getItemIndexByProperty(
            propertyValue,
            propertyName,
        );
        return itemIndex >= 0 ? this.removeItemByIndex(itemIndex) : undefined;
    }

    override getItemIndex(
        requestedItem: GT_Item,
        propertyName?: T_CollectionItemProps,
    ): number {
        if (this.items.length === 0) return -1;

        if (propertyName)
            return this.getItemIndexByProperty(
                requestedItem[propertyName],
                propertyName,
            );

        return this.getItemIndexByProperty(requestedItem.id, 'id');
    }

    override removeItem(item: GT_Item): GT_Item | undefined {
        return this.removeItemByProperty(item.id);
    }
}
