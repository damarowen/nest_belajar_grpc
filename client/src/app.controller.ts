import {
  Controller,
  Logger,
  Post,
  Body,
  OnModuleInit,
  Get,
  Param,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.option';

interface IdUser {
  id: number;
}

interface IUserData {
  name: string;
  id: number;
  email: string;
}

interface INumberArray {
  data: number[];
}
interface ISumOfNumberArray {
  sum: number;
}

interface IGrpcService {
  accumulate(request: INumberArray): Promise<ISumOfNumberArray>;
  getSingleUser(request: IdUser): Promise<IUserData>;
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

  @Get('/:id')
  async getSingleUser(@Param('id') id: number) {
    const rs = await this.grpcService.getSingleUser({ id });
    console.log(rs, 'from server');
    return rs;
  }
}
