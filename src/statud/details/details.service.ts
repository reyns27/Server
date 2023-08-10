import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";
import { details } from "./entities/details.entity";
import { CreateDetailsDto } from "./dto/create-details.dto";
import { UpdatedDetailsDto } from "./dto/update-details.dto";
import { StatudService } from "../statud.service";
import { error } from "console";

@Injectable()
export class DetailsService {
    constructor(
        @InjectRepository(details) private detailsServices: Repository<details>,
        private statudServices: StatudService,
        private Manager: EntityManager
    ) { }

    async createDetails(createDetailsDto: CreateDetailsDto) {
        const statudFound = await this.statudServices.findOne(createDetailsDto.statudId);

        if (!statudFound)
            return new HttpException('STATUD_NOT_FOUND', HttpStatus.NOT_FOUND);

        const newStatudDetails = this.detailsServices.create({
            ...createDetailsDto,
            status: 1,
        });

        if (!newStatudDetails)
            return new HttpException('ERROR_NEW-STATUD-DETAILS_FOUND', HttpStatus.FOUND);

        return this.detailsServices.save(newStatudDetails);
    };

    async findAll() {
        const result = await this.Manager.query('SELECT *FROM person')
            .then((data) => {
                return data
            })
            .catch((error) => console.log(error))
        console.log(result)
        return this.detailsServices.find({ relations: ['statud'] });
    }

    async findOneDetails(id: number) {
        const result = await this.detailsServices.findOne({
            where: { id },
            relations: ['statud'],
        });

        if (!result)
            return new HttpException('ERROR_STATUD_NOT_FOUND', HttpStatus.NOT_FOUND);

        return result;
    }

    async updateDetails(id: number, updateDetailsDto: UpdatedDetailsDto) {
        const detailsFound = await this.findOneDetails(id);
        if (detailsFound) {
            const updateDetails = await this.detailsServices.update(
                id, {
                ...updateDetailsDto
            },
            );
            if (updateDetails.affected == 1) return this.findOneDetails(id);
        }
        return new HttpException('ERROR_DETAILS_UPDATED_FOUND', HttpStatus.FOUND);
    };
}