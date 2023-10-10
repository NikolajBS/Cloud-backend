import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/order.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql-database",
      port: 3306,
      username: "admin_user",
      password: "admin_password",
      database: "cloud_bite_database",
      entities: [Order],
      synchronize: true,
      retryAttempts: 50,
    }),
    OrderModule,
  ],
})
export class AppModule {}
