
export class Item {
	id:          	 number;
    name:        	 string;
    description: 	 string;
	userId: 		 number;
	itemTypeNumber:  number;
    price:       	 number;
    rowStatusNumber: number;


	constructor(
		id: number,
		name: string,
		description: string,
		userId:      number,
		itemTypeNumber:  number,
		price: number,
		rowStatusNumber: number
	) {
		this.id = id,
		this.name = name,
		this.description = description,
		this.userId = userId,
		this.itemTypeNumber = itemTypeNumber,
		this.price = price,
		this.rowStatusNumber = rowStatusNumber
	}
};
