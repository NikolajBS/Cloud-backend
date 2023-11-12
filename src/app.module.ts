import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/order.entity";
import { OpenAIModule } from "./openai/openai.module";
import { DeepaiModule } from "./deepai/deepai.module"
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Order],
      synchronize: true,
      retryAttempts: 50,
    }),
    OrderModule,
    OpenAIModule,
    DeepaiModule,
  ],
})
export class AppModule {}