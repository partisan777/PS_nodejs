import { WarehouseBalanceModel } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export class WarehouseBalance {
	id: number;
	name: string;
	description: string;
	userId: number;
	itemId: number;
	quantity: number | Decimal;
	objectStatusId: number;
	constructor(balanceModel: WarehouseBalanceModel) {
		this.id = balanceModel.id;
		this.name = balanceModel.name;
		this.description = balanceModel.description;
		this.userId = balanceModel.userId;
		this.itemId = balanceModel.itemId;
		this.quantity = balanceModel.quantity;
		this.objectStatusId = balanceModel.objectStatusId;
	}
};
