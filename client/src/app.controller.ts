import {
  Controller,
  Logger,
  Post,
  Body,
  OnModuleInit,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.option';
import { Observable } from 'rxjs';

interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  getSingleUser(IdUser: number): Observable<any>;
}
interface INumberArray {
  data: number[];
}

@Controller('api/v1')
export class AppController implements OnModuleInit {
  private logger = new Logger('AppController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController'); // <-- Add this
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.grpcService.accumulate({ data }); // <-- to this
  }

  @Post('/:id')
  getSingleUser(@Body('IdUser') IdUser: number) {
    console.log(IdUser, 'AA');
    return this.grpcService.getSingleUser(100);
  }
}
