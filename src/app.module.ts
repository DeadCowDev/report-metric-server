import { Module } from '@nestjs/common';
import { controllers } from './features';

@Module({
  imports: [...controllers],
  controllers: [],
  providers: [],
})
export class AppModule {}
