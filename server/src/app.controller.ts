import { Controller, Logger } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  data: number[];
}

interface ISumOfNumberArray {
  sum: number;
}

interface IdUser {
  id: number;
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
  getSingleUser(IdUser: IdUser): IUserData {
    const dataUser = [
      { id: 1, name: 'John', email: 'email' },
      { id: 2, name: 'Doe', email: 'email' },
    ];
    const u = dataUser.find(({ id }) => id == IdUser.id);
    if (u) return u;
    return { id: 0, name: '', email: '' };
  }
}
