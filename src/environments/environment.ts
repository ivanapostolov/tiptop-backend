import { IEnvironment } from "./environment.model";

export const environment: IEnvironment = {
    production: true,
    shouldLog: false,
    API_PROTOCOL: 'http:',
    API_HOST: 'localhost',
    API_PORT: '3000',
};
