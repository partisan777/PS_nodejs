import { ItemTypeModel } from "@prisma/client";

export class ItemType {
	id: number;
	description: string;
	objectStatusId: number;

	constructor(itemType: ItemTypeModel) {
		this.id = itemType.id;
		this.description = itemType.description;
		this.objectStatusId = itemType.objectStatusId;
	}
};
