import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  addOrder(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }
}
