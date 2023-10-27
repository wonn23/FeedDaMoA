import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    PostModule,
    StatisticsModule,
  ],
})
export class AppModule {}
