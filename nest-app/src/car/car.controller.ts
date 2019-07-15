import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';

@Controller('car')
export class CarController {
    // url/car/123?queryModel={}
    // 123: param
    // queryModel: query
    constructor(private readonly carService: CarService) { }

    @Post()
    async create(@Body() createCatDto: CreateCarDto) {
        this.carService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Car[]> {
        return this.carService.findAll();
    }
}
