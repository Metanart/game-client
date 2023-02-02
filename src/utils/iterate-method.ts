export function iterateMethod<GT_InpuArgs, GT_OutputResults = GT_InpuArgs>(
    args: GT_InpuArgs[],
    method: Function,
): GT_OutputResults[] | undefined {
    let results: GT_OutputResults[] = [];

    for (let index = 0; index < args.length; index++) {
        const result = method(args[index]);
        if (result) results.push(result);
    }

    return results.length > 0 ? results : undefined;
}
