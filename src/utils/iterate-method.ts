export function iterateMethod<TGInputEntity, TGOutputEntity = TGInputEntity>(
    entities: TGInputEntity[],
    performingMethod: Function,
): TGOutputEntity[] | undefined {
    const results = entities
        .map((entity) => performingMethod(entity))
        .filter(Boolean) as TGOutputEntity[];
    return results.length > 0 ? results : undefined;
}
