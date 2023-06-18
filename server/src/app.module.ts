import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './shared/configs';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig),
    AuthModule,
    UserModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
