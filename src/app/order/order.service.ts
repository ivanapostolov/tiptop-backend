import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { Order } from './order.model';

@Injectable()
export class OrderService 
{
    async sendMail(order: Order): Promise<string>
    {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL_NAME,
                pass: process.env.SENDER_EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL_NAME,
            to: process.env.RECEIVER_EMAIL_NAME,
            subject: 'New Order',
            html: orderTemplate(order)
        };

        try
        {
            const info = await transporter.sendMail(mailOptions);

            console.log(info);

            return 'Order was successfully sent';
        }
        catch (error)
        {
            const response = { message: 'Input data validation failed', error };

            console.error(error);

            throw new HttpException(response, HttpStatus.BAD_REQUEST);
        }
    }
}

const generateRow = (key: string, value: any): string => 
{
    return `<tr>
       <td style="border: 1px solid #ddd; padding: 8px;">${key}</td>
       <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
    </tr>`;
}
 
const generateRows = (order: Order): string => 
{
    let response = '';
 
    response += generateRow('Service', order.service.name)
 
    if (order.service.data) 
    {
        response += Object.entries(order.service.data).reduce((accumulator, [key, value]) => 
        {
            return accumulator + generateRow(key, value);
        }, '');
    }
 
    response += Object.entries(order.contactData).reduce((accumulator, [key, value]) => 
    {
        return accumulator + generateRow(key, value);
    }, '');
 
    return response;
}

const orderTemplate = (order: Order): string => 
{
    return `
       <table id="customers" style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
          <tr>
             <th style="padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; color: white;">Поле</th>
             <th style="padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D; color: white;">Стойност</th>
          </tr>
          ${ generateRows(order) }
       </table>`
}
