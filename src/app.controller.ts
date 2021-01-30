import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/')
    getData() {
        return this.appService.getData();
    }

    @Post('/validate-rule')
    validate(@Body() data){
      const response = {
        message: "rule should be an object.",
        status: "error",
        data: "null"
      }

      const response0 = {
        message: `Invalid JSON payload passed.`,
        status: "error",
        data: "null"
        }

      const response1 = {
        message: "rule is required.",
        status: "error",
        data: "null"
      }

      const response2 = {
        message: "data is required.",
        status: "error",
        data: "null"
      }

      const response3 = {
        message: `field ${data.rule.field} is missing from data.`,
        status: "error",
        data: "null"
      }

      if (data.rule !== null && typeof data.rule !== 'object') {
        throw new HttpException(response, HttpStatus.BAD_REQUEST);
      }

      if(!data.rule.field || !data.rule.condition || !data.rule.condition_value){
        throw new HttpException(response0, HttpStatus.BAD_REQUEST);
      }
      if (!data.data[data.rule.field]) {
        throw new HttpException(response3, HttpStatus.BAD_REQUEST);
      }

      if (!data.rule && !data.data) {
        throw new HttpException(response0, HttpStatus.BAD_REQUEST);
      }
      else if (!data.rule) {
        throw new HttpException(response1, HttpStatus.BAD_REQUEST);
      }
      else if (!data.data) {
        throw new HttpException(response2, HttpStatus.BAD_REQUEST);
      }
      return this.appService.validate(data);
    }  
    
}
