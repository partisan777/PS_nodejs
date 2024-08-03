import { ObjectStatusModel } from "@prisma/client";

export class ObjectStatus {
	id: number;
	description: string;

	constructor(objectSatus: ObjectStatusModel) {
		this.id = objectSatus.id;
		this.description = objectSatus.description;
	}
}
