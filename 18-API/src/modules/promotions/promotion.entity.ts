
export class Promotion {
	id:              number;
	name:            string;
	description:     string;
	discoutnPercent: number;
	rowStatusNumber:     number;
	userId:          number;

	constructor(
		id:              number,
		name:            string,
		description:     string,
		discoutnPercent: number,
		rowStatusNumber: number,
		userId:          number
	)
	{
		this.id = id,
		this.name = name,
		this.description = description,
		this.discoutnPercent = discoutnPercent,
		this.rowStatusNumber = rowStatusNumber,
		this.userId = userId
	};

};
