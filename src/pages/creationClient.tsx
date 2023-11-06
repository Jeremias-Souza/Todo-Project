/* eslint-disable react/no-children-prop */
import HeaderNoFilter from "@/app/components/headerNoFilter";
import Privator from "@/app/components/privator";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import "src/app/globals.css";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ItemFormNewClient from "@/app/components/itemFormNewClient";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function CreationClient() {
  const [showModal, setShowModal] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const firestoreData = ["Jeremias", "Souza"];

  const filterData = () => {
    const filtered = firestoreData.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [filter]);

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
            <div className="flex items-center justify-center h-screen">
              <Card>
                <CardHeader>
                  <CardTitle>Pesquise a placa do veiculo:</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Command>
                    <Input
                      placeholder="Digite a placa do veiculo:"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                    <CommandList>
                      {filteredData.length === 0 ? (
                        <CommandEmpty>
                          Nenhum resultado encontrado.
                        </CommandEmpty>
                      ) : (
                        filteredData.map((resultFilter, index) => (
                          <CommandItem key={index}>{resultFilter}</CommandItem>
                        ))
                      )}
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
