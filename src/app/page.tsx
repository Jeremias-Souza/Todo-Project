"use client";

import { firestore } from "../server/firestore";
import { collection, query, where } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";

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
        cards={todos?.docs as QueryDocumentSnapshot<CardItem>[]}
        title="À fazer"
        status={CardItemStatus.todo}
      ></List>
      <List
        cards={doing?.docs as QueryDocumentSnapshot<CardItem>[]}
        title="Em desenvolvimento"
        status={CardItemStatus.doing}
      ></List>
      <List
        cards={done?.docs as QueryDocumentSnapshot<CardItem>[]}
        title="Concluído"
        status={CardItemStatus.done}
      ></List>
    </div>
  );
}
