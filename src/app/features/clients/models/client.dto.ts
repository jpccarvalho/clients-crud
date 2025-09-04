import { Client } from './index';

export interface CreateClientDto extends Omit<Client, 'id'> {}

export interface UpdateClientDto extends Partial<CreateClientDto> {}
