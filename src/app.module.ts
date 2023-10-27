import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/order.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password123",
      database: "cloudDB",
      entities: [Order],
      synchronize: true,
      retryAttempts: 50,
    }),
    OrderModule,
  ],
})
export class AppModule {}
