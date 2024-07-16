export const generateSortParamsCondition = (params: Record<string, any>, dict: Record<string, string[]> ): Record<string, unknown>[] => {
    const result: Record<string, unknown>[] = [];
	const keysDict = Object.keys(dict);
    for (let value of keysDict) {
			if (params[value]) {
        		const obj = {[dict[value][0]]: params[value] ? params[value] : dict[value][1] };
				result.push(obj);
			};
    };
    return result;
};
