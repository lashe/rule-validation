import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  response = 
    {
    message : "My Rule-Validation API",
    status : "success",
    data :
    {
        name: "Dada Toluwalase",
        github : "@lashe",
        email : "tee1alive@yahoo.com",
        mobile : "07065518784"
    }
    
  };
    

   getData() {
       return this.response;
   }

    validate(req) {
        const dataField = req.rule.field;
        const rule = {
            condition: req.rule.condition,
            condition_value: req.rule.condition_value
        }
        const data = {
            field: req.data[dataField]
        }
        const response1 = {
            message: `field ${dataField} successfully validated.`,
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: dataField,
                    field_value: data.field,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        }
        const response2 = {
            message: `field ${dataField} validation failed.`,
            status: "error",
            data: {
                validation: {
                    error: true,
                    field: dataField,
                    field_value: data.field,
                    condition: rule.condition,
                    condition_value: rule.condition_value
                }
            }
        }

        if (rule.condition === 'eq') {
            if (data.field === rule.condition_value) {
                return response1;
            }
            throw new HttpException(response2, HttpStatus.BAD_REQUEST);
        } else if (rule.condition === 'neq') {
            if (data.field !== rule.condition_value) {
                return response1;
            }
            throw new HttpException(response2, HttpStatus.BAD_REQUEST);
        } else if (rule.condition === 'gt') {
            if (data.field > rule.condition_value) {
                return response1;
            }
            throw new HttpException(response2, HttpStatus.BAD_REQUEST);
        } else if (rule.condition === 'gte') {
            if (data.field >= rule.condition_value) {
                return response1;
            }
            throw new HttpException(response2, HttpStatus.BAD_REQUEST);
        } else if (rule.condition === 'contains') {
            if (data.field.includes(rule.condition_value) === true) {
                return response1;
            }
            throw new HttpException(response2, HttpStatus.BAD_REQUEST);
        }
        throw new HttpException(response2, HttpStatus.BAD_REQUEST);
    }
}
