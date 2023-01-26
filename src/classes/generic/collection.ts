import { CL_List } from './list';

type T_CollectionItemProps = 'id' | 'ownerId';

export type T_CollectionItem = {
    [Key in T_CollectionItemProps]: any;
};

export class CL_Collection<
    GT_Item extends T_CollectionItem,
> extends CL_List<GT_Item> {
    getItemByProperty(
        propertyValue: string | number,
        propertyName: T_CollectionItemProps,
    ): GT_Item | undefined {
        const itemIndex = this.getItemIndexByProperty(
            propertyValue,
            propertyName,
        );
        return itemIndex >= 0 ? this.list[itemIndex] : undefined;
    }

    getItemIndexByProperty(
        propertyValue: string | number,
        propertyName: T_CollectionItemProps,
    ): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex(
            (item) => item[propertyName] === propertyValue,
        );
    }

    removeItemByProperty(
        propertyValue: string | number,
        propertyName: T_CollectionItemProps,
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
        if (this.list.length === 0) return -1;

        if (propertyName)
            return this.getItemIndexByProperty(
                requestedItem[propertyName],
                propertyName,
            );

        return this.getItemIndexByProperty(requestedItem.id, 'id');
    }
}
