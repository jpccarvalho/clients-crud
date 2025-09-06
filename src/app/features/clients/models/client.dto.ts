import { Client } from './index';

export interface ClientDto extends Omit<Client, 'id'> {}
