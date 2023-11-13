"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemFormNewClients } from "@/types/CardItem";
import { QueryDocumentSnapshot } from "firebase/firestore";

export type ClientProps = {
  doc: QueryDocumentSnapshot<ItemFormNewClients>;
};

export default function TableClient({ doc }: ClientProps) {
  const {
    idVehicle,
    modelVehicle,
    brandVehicle,
    motorization,
    nameClient,
    telCliente,
  } = doc?.data() || {};

  const openProfileClient = () => {
    window.location.href = "/profileClient";
  };

  return (
    <div className="flex items-center justify-center pt-36">
      <Table>
        <TableCaption>Lista de seus clientes ativos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Placa:</TableHead>
            <TableHead>Modelo / Motorização:</TableHead>
            <TableHead>Nome:</TableHead>
            <TableHead>Número:</TableHead>
            <TableHead className="text-right">Marca</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow onClick={openProfileClient}>
            <TableCell className="font-medium">{idVehicle}</TableCell>
            <TableCell>
              {modelVehicle} / {motorization}
            </TableCell>
            <TableCell>{nameClient}</TableCell>
            <TableCell>{telCliente}</TableCell>
            <TableCell className="text-right">{brandVehicle}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
