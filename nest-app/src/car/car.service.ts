import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
    constructor(@Inject('CAR_MODEL') private readonly carModel: Model<Car>) { }

    async create(createCatDto: CreateCarDto): Promise<Car> {
        const createdCar = new this.carModel(createCatDto);
        return await createdCar.save();
    }

    async findAll(): Promise<Car[]> {
        return await this.carModel.find().exec();
    }
}
