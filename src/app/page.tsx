"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";

import List from "./components/list";
import FirestoreService from "@/services/firestore.service";
import { useState } from "react";

export default function Home() {
  const [textFilter, setTextFilter] = useState("");

  const [todos] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.todo
    )
  );

  const [doing] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.doing
    )
  );

  const [done] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.done
    )
  );

  return (
    <div className="flex items-center justify-items-center">
      <div className="flex items-center justify-center gap-5 mt-10 ">
        <List
          textFilter={textFilter}
          setTextFilter={setTextFilter}
          cards={todos?.docs as QueryDocumentSnapshot<CardItem>[]}
          title="À fazer"
          status={CardItemStatus.todo}
        ></List>
        <List
          textFilter={textFilter}
          setTextFilter={setTextFilter}
          cards={doing?.docs as QueryDocumentSnapshot<CardItem>[]}
          title="Em desenvolvimento"
          status={CardItemStatus.doing}
        ></List>
        <List
          textFilter={textFilter}
          setTextFilter={setTextFilter}
          cards={done?.docs as QueryDocumentSnapshot<CardItem>[]}
          title="Concluído"
          status={CardItemStatus.done}
        ></List>
      </div>
    </div>
  );
}
