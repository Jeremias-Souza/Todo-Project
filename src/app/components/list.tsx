import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import Item from "../components/item";
import Form from "../components/itemFormDialog";
import { useState } from "react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Header from "../components/header";
import PrivateRoute from "./privateRoute";

export type ListProps = {
  status: CardItemStatus;
  title: string;
  cards?: QueryDocumentSnapshot<CardItem>[];
  textFilter: string;
  setTextFilter: (val: string) => void;
};

export default function List({
  textFilter,
  setTextFilter,
  title,
  cards,
  status,
}: ListProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <PrivateRoute>
      <Header filter={textFilter} setFilter={setTextFilter}></Header>
      <div>
        <Card className="columnsList overflow-y-auto overflow-x-hidden">
          <CardHeader className="bg-orange-600">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="min-h-screen">
            <br />
            <Button className="w-full" onClick={() => setShowModal(true)}>
              Adicionar
            </Button>
            <br />
            <br />
            {cards
              ?.filter(
                (card) =>
                  card
                    .data()
                    .title.toLowerCase()
                    .indexOf(textFilter.toLowerCase()) != -1 ||
                  card
                    .data()
                    .description.toLowerCase()
                    .indexOf(textFilter.toLowerCase()) != -1
              )
              .map((card, index) => (
                <div key={index}>
                  <Item doc={card}></Item>
                  <br />
                </div>
              ))}
          </CardContent>
        </Card>
        <Form
          status={status}
          show={showModal}
          close={() => setShowModal(false)}
        ></Form>
      </div>
    </PrivateRoute>
  );
}
