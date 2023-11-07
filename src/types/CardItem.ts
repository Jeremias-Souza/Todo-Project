export enum CardItemStatus {
  todo = 0,
  doing = 1,
  done = 2,
  filed = 3,
}

export type CardItem = {
  title: string;
  description: string;
  createdAt: string;
  status: CardItemStatus;
};

export enum ItemFormNewClientsStatus {
  disponivel = 1,
  notDisponivel = 0,
}

export type ItemFormNewClients = {
  idVehicle: string;
  modelVehicle: string;
  brandVehicle: string;
  motorization: string;
  birthYear: string;
  nameClient: string;
  telCliente: string;
  createdAt: string;
  status: ItemFormNewClientsStatus;
};
