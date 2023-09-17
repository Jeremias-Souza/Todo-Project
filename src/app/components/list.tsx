import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import Item from "../components/item";
import Form from "../components/itemFormDialog";
import { useState } from "react";

export type ListProps = {
  status: CardItemStatus;
  title: string;
  cards?: Array<CardItem>;
};

export default function List({ title, cards, status }: ListProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="w-96">
        <CardHeader className="bg-orange-500">
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
              <Item title={card.title} description={card.description}></Item>
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
