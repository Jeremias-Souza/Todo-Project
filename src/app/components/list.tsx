import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import Item from "../components/item";
import Form from "../components/itemFormDialog";
import { useState } from "react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Header from "../components/header";

export type ListProps = {
  status: CardItemStatus;
  title: string;
  cards?: QueryDocumentSnapshot<CardItem>[];
};

export default function List({ title, cards, status }: ListProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header></Header>
      <Card className="columnsList overflow-y-auto overflow-x-hidden">
        <CardHeader className="bg-teal-800">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-screen">
          <br />
          <Button className="w-full" onClick={() => setShowModal(true)}>
            Adicionar
          </Button>
          <br />
          <br />
          {cards?.map((card, index) => (
            <div key={index}>
              <Item doc={card} status={status}></Item>
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
    </>
  );
}
