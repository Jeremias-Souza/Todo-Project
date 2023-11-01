/* eslint-disable react/no-children-prop */
import Header from "@/app/components/header";
import PrivateRoute from "@/app/components/privateRoute";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";
import "src/app/globals.css";

export type ListProps = {
  status: CardItemStatus;
  title: string;
  cards?: QueryDocumentSnapshot<CardItem>[];
};

export default function CreationClient(
  textFilter: string,
  setTextFilter: (val: string) => void
) {
  return (
    <PrivateRoute>
      <Header filter={""} setFilter={setTextFilter}></Header>
    </PrivateRoute>
  );
}
