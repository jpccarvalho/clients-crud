import { Client } from '../models';

export class PersistenceMock {
  public static getClients(clientsFromAPI: Client[]): Client[] {
    const storageString = localStorage.getItem('clientsStored');
    const clientsInStorage: Client[] = !!storageString
      ? JSON.parse(storageString)
      : [];

    const clientList = [...clientsInStorage, ...clientsFromAPI];

    console.log(clientList);

    return this.filterClientsToShow(clientList);
  }

  public static createClient(client: Client) {
    const storageString = localStorage.getItem('clientsStored');
    const clientsInStorage: Client[] = !!storageString
      ? JSON.parse(storageString)
      : [];

    const updatedClientsInStorage = JSON.stringify([
      ...clientsInStorage,
      client,
    ]);

    localStorage.setItem('clientsStored', updatedClientsInStorage);
  }

  public static deleteClient(clientId: number) {
    const storageString = localStorage.getItem('deletedClients');
    const deletedClientsInStorage = !!storageString
      ? JSON.parse(storageString)
      : [];

    const updatedClientsInStorage = JSON.stringify([
      ...deletedClientsInStorage,
      clientId,
    ]);
    localStorage.setItem('deletedClients', updatedClientsInStorage);
  }

  public static filterClientsToShow(clients: Client[]) {
    const storageString = localStorage.getItem('deletedClients');
    const deletedClients: number[] = !!storageString
      ? JSON.parse(storageString)
      : [];

    return clients
      .filter((client) => !deletedClients.includes(client.id))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }
}
