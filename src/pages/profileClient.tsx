"use client";
import "src/app/globals.css";
import Header from "@/app/components/headerNoFilter";
import { CardTitle } from "@/components/ui/card";
import { QueryDocumentSnapshot } from "@firebase/firestore";
import { ItemFormNewClients } from "@/types/CardItem";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Command } from "@/components/ui/command";
import Privator from "@/app/components/privator";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/server/firebase.config";
import TableServices from "@/app/components/tableServices";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ItemFormNewService from "@/app/components/itemFormNewService";

export type ClientProps = {
  doc: QueryDocumentSnapshot<ItemFormNewClients>;
  clients: QueryDocumentSnapshot<ItemFormNewClients>;
};

export default function ProfileClient({ doc, clients }: ClientProps) {
  const { nameClient, telCliente } = doc?.data() || {};
  const [user, loading] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="p-4 rounded-md overflow-y-hidden">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : user ? (
          <div>
            <Header></Header>
            <Button
              className="buttonNewService"
              form="insert-form"
              type="submit"
              onClick={() => setShowModal(true)}
            >
              Criar Novo Serviço
            </Button>
            <ItemFormNewService
              show={showModal}
              close={() => setShowModal(false)}
            ></ItemFormNewService>
            <div className="fixed">
              <Avatar className="fixed h-24 w-24 top-20 left-4">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="ml-32 mt-16">
                <CardTitle>Jeremias Souza (Ford - Focus / GYX-3598)</CardTitle>
                <Command>Número: (47) 99631-5355</Command>
                <Command>Ano: 2012</Command>
                <Command>Motorização: 2.0</Command>
              </div>
            </div>
            <TableServices doc={clients}></TableServices>
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
