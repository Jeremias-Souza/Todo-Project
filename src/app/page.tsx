"use client";

import { firestore } from "../server/firestore";
import { collection, query, where } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { CardItemStatus } from "@/types/CardItem";
import List from "./components/list";

export default function Home() {
  const cardsColl = collection(firestore, "cards");

  const [todos] = useCollection(
    query(cardsColl, where("status", "==", CardItemStatus.todo))
  );
  const [doing] = useCollection(
    query(cardsColl, where("status", "==", CardItemStatus.doing))
  );
  const [done] = useCollection(
    query(cardsColl, where("status", "==", CardItemStatus.done))
  );

  return (
    <div className="flex items-center justify-center gap-5 mt-10">
      <List
        cards={todos?.docs
          .map((doc) => doc.data())
          .map((card) => ({
            title: card.title,
            description: card.description,
            createdAt: card.createdAt,
            status: card.status,
          }))}
        title="À fazer"
        status={CardItemStatus.todo}
      ></List>
      <List
        cards={doing?.docs
          .map((doc) => doc.data())
          .map((card) => ({
            title: card.title,
            description: card.description,
            createdAt: card.createdAt,
            status: card.status,
          }))}
        title="Em desenvolvimento"
        status={CardItemStatus.doing}
      ></List>
      <List
        cards={done?.docs
          .map((doc) => doc.data())
          .map((card) => ({
            title: card.title,
            description: card.description,
            createdAt: card.createdAt,
            status: card.status,
          }))}
        title="Concluído"
        status={CardItemStatus.done}
      ></List>
    </div>
  );
}
