import type { Decimal } from "@prisma/client/runtime/library";

export class Item {
	id: number;
	name: string;
	description: string;
	userId: number;
	itemTypeId: number;
	price: number | Decimal;
	objectStatusId: number;
	constructor(
		id: number,
		name: string,
		description: string,
		userId: number,
		itemTypeId: number,
		price: number | Decimal,
		objectStatusId: number,
	) {
		(this.id = id),
			(this.name = name),
			(this.description = description),
			(this.userId = userId),
			(this.itemTypeId = itemTypeId),
			(this.price = price),
			(this.objectStatusId = objectStatusId);
	}
}
