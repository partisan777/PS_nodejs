
export class Item {
	id:          	 number;
    name:        	 string;
    description: 	 string;
	itemTypeNumber:  number; 
    price:       	 number;
    rowStatusNumber: number;


	constructor(
		id: number,
		name: string,
		description: string,
		itemTypeNumber:  number, 
		price: number,
		rowStatusNumber: number	
	) {
		this.id = id,
		this.name = name,
		this.description = description,
		this.itemTypeNumber = itemTypeNumber,
		this.price = price,
		this.rowStatusNumber = rowStatusNumber	
	}
};
