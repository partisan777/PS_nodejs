import { ItemModel } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export class Item {
	id: number;
	name: string;
	description: string;
	userId: number;
	itemTypeId: number;
	price: number | Decimal;
	objectStatusId: number;
	constructor(item: ItemModel)
	{
		this.id = item.id;
		this.name = item.name;
		this.description = item.description;
		this.userId = item.userId;
		this.itemTypeId = item.itemTypeId;
		this.price = item.price;
		this.objectStatusId = item.objectStatusId;
	}
}
