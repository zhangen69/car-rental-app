import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('car')
export class CarController {
    // url/car/123?queryModel={}
    // 123: param
    // queryModel: query

    @Get() // get all cars
    getCollection(@Query('queryModel') queryModel) {
        return [{ name: 'test1' }, { name: 'test2' }];
    }

    @Get(':id') // get a car find by id
    getItemById(@Param('id') id: string, @Query('includes') includes) {
        return { id, includes };
    }
}
