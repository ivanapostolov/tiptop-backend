import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController 
{
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async addOrder(@Body() body: OrderDto)
    {
        return await this.orderService.sendMail(body);
    }
}
