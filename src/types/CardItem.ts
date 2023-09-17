export enum CardItemStatus {
  todo = 0,
  doing = 1,
  done = 2,
}

export type CardItem = {
  title: string;
  description: string;
  createdAt: string;
  status: CardItemStatus;
};
