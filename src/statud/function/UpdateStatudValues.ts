import { details } from "../details/entities/details.entity";

export function SpencesStatud(details:details[]):number {
    let value:number = 0;
    details.map((element) => {
       value = element.value + value;
    })
    return value;
}