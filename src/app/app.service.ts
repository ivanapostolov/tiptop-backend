import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService 
{
    getDefaultMessage(): string 
    {
        return '<h2> TipTop backend is up and running! </h2>';
    }
}
