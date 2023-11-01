/* eslint-disable react/no-children-prop */
import HeaderNoFilter from "@/app/components/headerNoFilter";
import Privator from "@/app/components/privator";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/firebase.config";
import { CardItem, CardItemStatus } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "src/app/globals.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemFormNewClient from "@/app/components/itemFormNewClient";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export type SearchProps = {
  filter: string;
  setFilter: (val: string) => void;
};

export type ListProps = {
  status: CardItemStatus;
  title: string;
  cards?: QueryDocumentSnapshot<CardItem>[];
};

export default function CreationClient({ filter, setFilter }: SearchProps) {
  const [showModal, setShowModal] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [textFilter, setTextFilter] = useState("");

  return (
    <div>
      <div className="p-4 rounded-md overflow-y-hidden">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : user ? (
          <div>
            <HeaderNoFilter></HeaderNoFilter>
            <ItemFormNewClient
              show={showModal}
              close={() => setShowModal(false)}
            ></ItemFormNewClient>

            <Button
              className="fixed mt-16 mr-96"
              form="insert-form"
              type="submit"
              onClick={() => setShowModal(true)}
            >
              Criar Novo Cadastro
            </Button>
            <div className="flex items-center justify-center h-screen w-screen">
              <Card>
                <CardHeader>
                  <CardTitle>Pesquise um Cliente</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Command>
                    <Input
                      value={filter}
                      onChange={(val) => setFilter(val.target.value)}
                      placeholder="Digite o nome do cliente:"
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandItem></CommandItem>
                    </CommandList>
                  </Command>
                </CardFooter>
              </Card>
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
