import { PromotionModel } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export class Promotion {
	id: number;
	name: string;
	description: string;
	discoutnPercent: number | Decimal;
	objectStatusId: number;
	userId: number;

	constructor(promo: PromotionModel) {
		this.id = promo.id;
		this.name = promo.name;
		this.description = promo.description;
		this.discoutnPercent = promo.discoutnPercent;
		this.objectStatusId = promo.objectStatusId;
		this.userId = promo.userId;
	}
};
