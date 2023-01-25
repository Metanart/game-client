export function iterateMethod<TG_InputEntity, TG_OutputEntity = TG_InputEntity>(
    entities: TG_InputEntity[],
    performingMethod: Function,
): TG_OutputEntity[] | undefined {
    const results = entities
        .map((entity) => performingMethod(entity))
        .filter(Boolean) as TG_OutputEntity[];
    return results.length > 0 ? results : undefined;
}
