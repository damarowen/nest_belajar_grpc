/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Logger } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  data: number[];
}

interface ISumOfNumberArray {
  sum: number;
}
interface IUser {
  data: number;
}
interface IUserData {
  name: string;
  id: number;
  email: string;
}

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private mathService: MathService) {}

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(numberArray: INumberArray): ISumOfNumberArray {
    this.logger.log('from client' + numberArray.data.toString());
    return { sum: this.mathService.accumulate(numberArray.data) };
  }

  @GrpcMethod('AppController', 'getSingleUser')
  getSingleUser(IdUser: number, meta: any): IUserData {
    console.log(meta);
    console.log(JSON.stringify(IdUser), 'zzz');
    const u = {
      name: 'damar',
      id: IdUser,
      email: 'asu',
    };
    return u;
  }
}
