import { Decimal } from "@prisma/client/runtime/library";

export class WarehouseBalance {
	id: number;
	name: string;
  	description: string;
	userId: number;
	itemId: number;
	quantity: number | Decimal;
	objectStatusId: number;
	constructor(
		id: number,
		name: string,
  		description: string,
		userId: number,
		itemId: number,
		quantity: number | Decimal,
		objectStatusId: number
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.userId = userId;
		this.itemId = itemId;
		this.quantity = quantity;
		this.objectStatusId = objectStatusId;
	};
};
