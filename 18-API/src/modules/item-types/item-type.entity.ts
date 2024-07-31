export class ItemType {
	id: number;
	description: string;
	objectStatusId: number;

	constructor(id: number, description: string, objectStatusId: number) {
		(this.id = id),
			(this.description = description),
			(this.objectStatusId = objectStatusId);
	}
}
