"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, Trash2 } from "lucide-react";
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
    <Card className="flex cardItem">
      <div className="title">
        <CardHeader className="overflow-hidden">
          <CardTitle className="CardTitle">{title}</CardTitle>
          <CardContent className="description">{description}</CardContent>
        </CardHeader>

        <CardFooter className="footerCard">
          <Button onClick={deleteCard} className="btnDelete">
            <Trash2 />
          </Button>
          <Button onClick={newStatus} className="btnPassed">
            <ArrowRight />
          </Button>
        </CardFooter>
      </div>

      <div className="footerCard"></div>
    </Card>
  );
}
