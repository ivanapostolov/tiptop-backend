interface BaseData 
{
    price: number;
}
 
interface HousemaidData extends BaseData 
{
    readonly discriminator: 'HousemaidData';
    plan: string;
    planName: string;
}

interface AreaData extends BaseData 
{
    readonly discriminator: 'AreaData';
    area: number;
}

interface WindowsData extends BaseData 
{
    readonly discriminator: 'WindowsData';
    small: number;
    big: number;
    doors: number;
    smallBlinds: number;
    bigBlinds: number;
    doorBlinds: number;
}

export type ServiceData = HousemaidData | AreaData | WindowsData;

export interface Service 
{
    readonly discriminator: 'Service';
    name: string;
    label: string;
    data?: ServiceData;
}

export interface ContactData 
{
    readonly discriminator: 'ContactData';
    firstName: string;
    lastName: string;
    address: string;
    date: string;
    comment: string;
    phone: string;
}

export interface Order 
{
    contactData: ContactData;
    service: Service;
}