"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { deleteDoc, updateDoc } from "@firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { CardItem, CardItemStatus } from "@/types/CardItem";

export type ItemProps = {
  doc: QueryDocumentSnapshot<CardItem>;
  status: CardItemStatus;
};

export default function Item({ doc, status }: ItemProps) {
  const { title, description } = doc.data();

  function deleteCard() {
    deleteDoc(doc.ref);
  }

  function newStatus() {
    let newDoc = doc.data();

    if (
      newDoc.status == CardItemStatus.todo ||
      newDoc.status == CardItemStatus.doing
    ) {
      newDoc.status += 1;
      updateDoc(doc.ref, newDoc);
      return;
    }

    deleteDoc(doc.ref);
  }

  return (
    <Card className="flex">
      <CardHeader className="overflow-hidden">
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">{description}</CardContent>
      <CardFooter>
        <Button onClick={deleteCard}>
          <Trash2 />
        </Button>
        <Button onClick={newStatus}>Teste</Button>
      </CardFooter>
    </Card>
  );
}
