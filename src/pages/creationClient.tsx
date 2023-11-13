/* eslint-disable react/no-children-prop */
import HeaderNoFilter from "@/app/components/headerNoFilter";
import Privator from "@/app/components/privator";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import "src/app/globals.css";
import ItemFormNewClient from "@/app/components/itemFormNewClient";
import { useState } from "react";
import TableClient from "@/app/components/tableClient";
import { ItemFormNewClients } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";

export type ClientProps = {
  clients: QueryDocumentSnapshot<ItemFormNewClients>;
};

export default function CreationClient({ clients }: ClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [user, loading] = useAuthState(auth);
  const filtered = "Teste";

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
            {/* <div className="flex items-center justify-center h-screen">
              <Card>
                <CardHeader>
                  <CardTitle>Pesquise a placa do veiculo:</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Command>
                    <Input placeholder="Digite a placa do veiculo:" />
                    <CommandList>
                      <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                      <CommandItem>{filtered}</CommandItem>
                    </CommandList>
                  </Command>
                </CardFooter>
              </Card>
            </div> */}
            <TableClient doc={clients}></TableClient>
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
