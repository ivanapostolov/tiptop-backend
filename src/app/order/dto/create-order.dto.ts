import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ContactData, Order, Service } from "../order.model";

export class OrderDto implements Order
{
    @IsNotEmpty()
    @ApiProperty()
    readonly contactData: ContactData;

    @IsNotEmpty()
    @ApiProperty()
    readonly service: Service;
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
    applyDecorators(
        ApiExtraModels(OrderDto, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(OrderDto) },
                    {
                        properties: {
                            contactData: {
                                type: './src/app/order/order.model/ContactData',
                                items: { $ref: getSchemaPath(dataDto) },
                            },
                            service: {
                                type: './src/app/order/order.model/Service',
                                items: { $ref: getSchemaPath(dataDto) },
                            },
                        },
                    },
                ],
            },
        })
    )