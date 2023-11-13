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

export default function TableServices({ doc }: ClientProps) {
  const {
    idVehicle,
    modelVehicle,
    brandVehicle,
    motorization,
    nameClient,
    telCliente,
  } = doc?.data() || {};

  return (
    <div className="flex items-center justify-center pt-48">
      <Table>
        <TableCaption>Lista de seus serviços prestados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">NF:</TableHead>
            <TableHead>Serviço Realizado:</TableHead>
            <TableHead>Data Prestada:</TableHead>
            <TableHead>Garantia:</TableHead>
            <TableHead className="text-right">Valor:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Troca de oleo</TableCell>
            <TableCell>20/09/2023</TableCell>
            <TableCell>6 meses</TableCell>
            <TableCell className="text-right">R$ 189,90</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Troca de amortecedores</TableCell>
            <TableCell>11/11/2023</TableCell>
            <TableCell>3 anos</TableCell>
            <TableCell className="text-right">R$ 430,00</TableCell>
          </TableRow>
          <TableRow className="bg-slate-100">
            <TableCell className="font-medium">Total:</TableCell>
            <TableCell>--</TableCell>
            <TableCell>--</TableCell>
            <TableCell>3.6 anos</TableCell>
            <TableCell className="text-right">R$ 619,09</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
