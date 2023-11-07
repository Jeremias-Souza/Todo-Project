import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import FirestoreService from "@/services/firestore.service";
import VanillaMasker from "vanilla-masker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChangeEvent, useEffect, useState } from "react";

export type ItemFormNewClientProps = {
  show: boolean;
  close: () => void;
};

export default function ItemFormNewClient({
  show,
  close,
}: ItemFormNewClientProps) {
  const schema = z.object({
    idVehicle: z.string().min(7).max(9),
    modelVehicle: z.string().min(1).max(40),
    brandVehicle: z.string().nonempty().max(40),
    motorization: z.string().min(2).max(40),
    birthYear: z.string().min(2).max(4),
    nameClient: z.string().nonempty().max(40),
    telClient: z.string().min(10).max(17),
    createdAt: z.string().length(13),
    status: z.number(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      idVehicle: "",
      modelVehicle: "",
      brandVehicle: "",
      motorization: "",
      birthYear: "",
      nameClient: "",
      telClient: "",
      createdAt: new Date().getTime().toString(),
      status: 1,
    },
  });

  const onSubmit = (value: z.infer<typeof schema>) => {
    FirestoreService.insert("clientProfile", value);
    clearFormAndCloseModal();
  };

  function clearFormAndCloseModal() {
    form.reset();
    close();
  }

  const phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
  const motorization = document.getElementById(
    "motorization"
  ) as HTMLInputElement;
  const idVehicle = document.getElementById("idVehicle") as HTMLInputElement;
  const birthYear = document.getElementById("birthYear") as HTMLInputElement;

  if (phoneInput) {
    VanillaMasker(phoneInput).maskPattern("(99) 99999-9999");
  }

  if (motorization) {
    VanillaMasker(motorization).maskPattern("9.9");
  }

  if (birthYear) {
    VanillaMasker(birthYear).maskPattern("9999");
  }
  const [selectedValue, setSelectedValue] = useState("option-one");

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  if (selectedValue === "option-one" && idVehicle) {
    VanillaMasker(idVehicle).maskPattern("AAA-9999");
  }
  if (selectedValue === "option-two" && idVehicle) {
    VanillaMasker(idVehicle).maskPattern("AAA-9A99");
  }
  return (
    <div className="flex items-center justify-center">
      <Dialog open={show} onOpenChange={clearFormAndCloseModal}>
        <DialogContent className="sm:max-w-[425px] max-h-screen mt-5 overflow-auto">
          <DialogHeader>
            <DialogTitle>Novo Cadastro</DialogTitle>
            <DialogDescription>
              Crie um novo cadastro de veiculo
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <RadioGroup className="mt-5" onClick={handleRadioChange}>
                <Label>Selecione o Modelo da Placa</Label>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Modelo Antigo</Label>
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Modelo Mercosul</Label>
                </div>
              </RadioGroup>
              <FormField
                control={form.control}
                name="idVehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa do Veiculo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="idVehicle"
                        placeholder="Placa do Veiculo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelVehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo do Veiculo</FormLabel>
                    <FormControl>
                      <Input placeholder="Modelo do Veiculo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandVehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca do Veiculo</FormLabel>
                    <FormControl>
                      <Input placeholder="Marca do Veiculo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motorization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motorização</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="motorization"
                        placeholder="Motorização"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano do Modelo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="birthYear"
                        placeholder="Ano do Modelo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameClient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome Cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telClient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="phoneInput"
                        placeholder="Telefone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            form="insert-form"
            type="submit"
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
