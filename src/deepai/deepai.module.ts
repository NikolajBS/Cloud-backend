import { Module } from '@nestjs/common';
import { DeepaiController } from './deepai.controller';
import { DeepaiService } from './deepai.service';

@Module({
  controllers: [DeepaiController],
  providers: [DeepaiService],
})
export class DeepaiModule {}
