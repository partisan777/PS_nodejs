
export class UserRole {
	id:            number;
  	description:   string;
  	statusNumber:  number;

	constructor(
		id:              number,
		description:     string,
		statusNumber:    number
	) {
		this.id = id,
		this.description = description,
		this.statusNumber = statusNumber	
	}
};
	