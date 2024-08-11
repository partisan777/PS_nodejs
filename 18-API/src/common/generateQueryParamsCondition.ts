export const generateQueryParamsCondition = (
	params: Record<string, any>,
	dict: Record<string, string[]>,
): Record<string, unknown>[] => {
	const result: Record<string, unknown>[] = [];
	const keysDict = Object.keys(dict);
	for (const value of keysDict) {
		if (params[value]) {
			// console.log({[dict[value][0]]: {[dict[value][1]]: params[value]}});
			const obj = { [dict[value][0]]: { [dict[value][1]]: params[value] } };
			result.push(obj);
		}
	}
	return result;
};
