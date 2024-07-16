import { IsNumber, IsString } from 'class-validator';


export class ItemSaveDto {

    @IsNumber()
    id: number;

    @IsString({ message: 'Не указано наименование товара' })
    name: string;

    @IsString({ message: 'Не указано описание товара' })
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    itemTypeNumber: number;

    @IsNumber()
    rowStatusNumber: number;
};
