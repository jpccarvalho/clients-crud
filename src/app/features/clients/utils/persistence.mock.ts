import { Client } from '../models';

export class PersistenceMock {
  public static getClients(clientsFromAPI: Client[]): Client[] {
    const storageString = localStorage.getItem('clientsStored');
    const clientsInStorage: Client[] = !!storageString
      ? JSON.parse(storageString)
      : [];

    const uniqueClients = Array.from(
      new Map(
        [...clientsFromAPI, ...clientsInStorage].map((c) => [c.id, c])
      ).values()
    );

    return this.filterClientsToShow(uniqueClients);
  }

  public static getClientById(id: number) {
    const storageString = localStorage.getItem('clientsStored');
    const clientsInStorage: Client[] = !!storageString
      ? JSON.parse(storageString)
      : [];

    if (!clientsInStorage.length) return undefined;

    return clientsInStorage.find((client) => client.id === id);
  }

  public static getCurrentId() {
    const storageString = localStorage.getItem('currentId');
    return !!storageString ? Number(storageString) : 20;
  }

  public static createClient(client: Client, replaceId: boolean = true) {
    const storageString = localStorage.getItem('clientsStored');
    const clientsInStorage: Client[] = !!storageString
      ? JSON.parse(storageString)
      : [];
    const newId = replaceId ? this.getCurrentId() + 1 : client.id;
    const updatedClientsInStorage = JSON.stringify([
      ...clientsInStorage,
      { ...client, id: newId },
    ]);

    localStorage.setItem('clientsStored', updatedClientsInStorage);
    localStorage.setItem('currentId', JSON.stringify(newId));
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

  public static updateClient(updatedClient: Client) {
    const storageString = localStorage.getItem('clientsStored');
    const clientsInStorage: Client[] = !!storageString
      ? JSON.parse(storageString)
      : [];

    const newClientsArray = clientsInStorage.map((client) =>
      client.id === updatedClient.id ? updatedClient : client
    );

    localStorage.setItem('clientsStored', JSON.stringify(newClientsArray));
  }
}
