import { Module } from '@nestjs/common';
import { ExposureModule } from './exposure/exposure.module';

@Module({
  imports: [ExposureModule],
})
export class AppModule {}
