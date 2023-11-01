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

export type ItemFormNewClientProps = {
  show: boolean;
  close: () => void;
};

export default function ItemFormNewClient({
  show,
  close,
}: ItemFormNewClientProps) {
  const schema = z.object({
    nameClient: z.string().nonempty().max(40),
    telClient: z.string().min(10).max(13),
    createdAt: z.string().length(13),
    status: z.number(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
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

  return (
    <Dialog open={show} onOpenChange={clearFormAndCloseModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Cadastro</DialogTitle>
          <DialogDescription>
            Crie um novo cadastro de veiculo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="insert-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
                    <Input placeholder="Telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button form="insert-form" type="submit">
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
