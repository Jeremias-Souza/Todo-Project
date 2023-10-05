"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ChevronRight, Trash2 } from "lucide-react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import FirestoreService from "@/services/firestore.service";

export type ItemProps = {
  doc: QueryDocumentSnapshot<CardItem>;
};

export default function Item({ doc }: ItemProps) {
  const { title, description } = doc.data();

  function deleteCard() {
    FirestoreService.delete(doc.ref);
  }

  function newStatus() {
    let newDoc = doc.data();

    if (
      newDoc.status == CardItemStatus.todo ||
      newDoc.status == CardItemStatus.doing
    ) {
      newDoc.status += 1;
      FirestoreService.update(doc.ref, newDoc);
      return;
    }

    FirestoreService.delete(doc.ref);
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
            <ChevronRight />
          </Button>
        </CardFooter>
      </div>
      <div className="footerCard"></div>
    </Card>
  );
}
