export function processEntitiesInLoopedMethod<
    TGInputEntity,
    TGOutputEntity = TGInputEntity,
>(
    entities: TGInputEntity[],
    appliedMethod: Function,
): TGOutputEntity[] | undefined {
    const results = entities
        .map((entity) => appliedMethod(entity))
        .filter(Boolean) as TGOutputEntity[];
    return results.length > 0 ? results : undefined;
}
