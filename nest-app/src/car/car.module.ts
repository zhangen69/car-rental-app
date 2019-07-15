import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { carProviders } from './car.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CarController],
    providers: [CarService, ...carProviders],
})
export class CarModule { }
