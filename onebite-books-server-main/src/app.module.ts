import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { DelayMiddleware } from './middleware/delay.middleware';
import { ReviewModule } from './review/review.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [BookModule, ReviewModule, TodoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('*'); // 모든 경로에 미들웨어 적용
  }
}
