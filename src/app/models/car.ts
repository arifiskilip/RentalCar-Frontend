import { Brand } from "./brand";
import { CarImage } from "./carImage";
import { Color } from "./color";

export class Car{
    id:number;
    brandId:number;
    colorId:number;
    modelName:string;
    modelYear:string;
    dailyPrice:number;
    description:string;
    color:Color;
    brand:Brand;
    carImages:CarImage[];
}