import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./order.entity";
import * as deepai from 'deepai';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("menu")
  getMenu(): any {
    const menu = [
      { name: "Salad", price: 5 },
      { name: "Soup", price: 4 },
      { name: "Burger", price: 10 },
      { name: "Pizza", price: 12 },
    ];
    return menu;
  }
  @Get("orders")
  getAllOrders(){
    return this.orderService.findAll();
  }

  @Post("order")
  createOrder(@Body() orderData: Order): Promise<Order> {
    return this.orderService.addOrder(orderData);
  }

  // create a post request to create new image based on text string
  // store the images in cloud storage or DB?
  // method to store the image in google bucket
  @Post('generate-image')
  async generateImage(@Body('text') text: string): Promise<string> {
  deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K'); 

  try {
    const resp = await deepai.callStandardApi("text2img", {
      text: text,
    });

    if (resp && resp.output_url) {
      return resp.output_url;
    } else {
      throw new Error('Failed to generate image.');
    }
  } catch (error) {
    throw new Error('Error generating image: ' + error.message);
  }
}
}
