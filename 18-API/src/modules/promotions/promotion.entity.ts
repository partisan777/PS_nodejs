import type { Decimal } from "@prisma/client/runtime/library";

export class Promotion {
	id: number;
	name: string;
	description: string;
	discoutnPercent: number | Decimal;
	objectStatusId: number;
	userId: number;

	constructor(
		id: number,
		name: string,
		description: string,
		discoutnPercent: number | Decimal,
		objectStatusId: number,
		userId: number,
	) {
		(this.id = id),
			(this.name = name),
			(this.description = description),
			(this.discoutnPercent = discoutnPercent),
			(this.objectStatusId = objectStatusId),
			(this.userId = userId);
	}
}
