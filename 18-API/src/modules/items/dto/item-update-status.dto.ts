import { IsNumber } from 'class-validator';


export class ItemUpdateSatusDto {

    @IsNumber()
    id: number;

    @IsNumber()
    newStatusId: number;

};
