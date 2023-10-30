"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";

import List from "./components/list";
import FirestoreService from "@/services/firestore.service";
import { useState } from "react";
import Privator from "./components/privator";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/server/firebase.config";

export default function Home() {
  const [textFilter, setTextFilter] = useState("");
  const [user, loading] = useAuthState(auth);

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

  const [filed] = useCollection(
    FirestoreService.filter<CardItem>(
      "cards",
      "status",
      "==",
      CardItemStatus.filed
    )
  );

  return (
    <div>
      <div className="p-4 rounded-md overflow-y-hidden">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : user ? (
          <div className="flex mt-6 mb-96">
            <div className="ml-0 mr-4">
              <List
                textFilter={textFilter}
                setTextFilter={setTextFilter}
                cards={todos?.docs as QueryDocumentSnapshot<CardItem>[]}
                title="À fazer"
                status={CardItemStatus.todo}
              ></List>
            </div>
            <div className="flex-1 mr-4">
              <List
                textFilter={textFilter}
                setTextFilter={setTextFilter}
                cards={doing?.docs as QueryDocumentSnapshot<CardItem>[]}
                title="Em desenvolvimento"
                status={CardItemStatus.doing}
              ></List>
            </div>
            <div className="flex-1 mr-4">
              <List
                textFilter={textFilter}
                setTextFilter={setTextFilter}
                cards={done?.docs as QueryDocumentSnapshot<CardItem>[]}
                title="Concluído"
                status={CardItemStatus.done}
              ></List>
            </div>
            <div className="flex-1 mr-4">
              <List
                textFilter={textFilter}
                setTextFilter={setTextFilter}
                cards={filed?.docs as QueryDocumentSnapshot<CardItem>[]}
                title="Arquivados"
                status={CardItemStatus.filed}
              ></List>
            </div>
          </div>
        ) : loading ? (
          <div className="spinner"></div>
        ) : (
          <Privator></Privator>
        )}
      </div>
    </div>
  );
}
