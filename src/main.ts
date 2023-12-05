import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  await app.listen(3000);
}

bootstrap();
