export function iterateMethod<GT_InputEntity, GT_OutputEntity = GT_InputEntity>(
    entities: GT_InputEntity[],
    performingMethod: Function,
): GT_OutputEntity[] | undefined {
    const results = entities
        .map((entity) => performingMethod(entity))
        .filter(Boolean) as GT_OutputEntity[];
    return results.length > 0 ? results : undefined;
}
