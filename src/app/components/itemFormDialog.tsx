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
import { CardItemStatus } from "@/types/CardItem";
import { useForm } from "react-hook-form";
import FirestoreService from "@/services/firestore.service";

export type ItemFormDialogProps = {
  show: boolean;
  close: () => void;
  status: CardItemStatus;
};

export default function ItemFormDialog({
  show,
  close,
  status,
}: ItemFormDialogProps) {
  const schema = z.object({
    title: z.string().nonempty().max(29),
    description: z.string().min(10),
    createdAt: z.string().length(13),
    status: z.number(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      createdAt: new Date().getTime().toString(),
      status: status,
    },
  });

  const onSubmit = (value: z.infer<typeof schema>) => {
    FirestoreService.insert("cards", value);
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
          <DialogTitle>Nova Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Crie novas ordens de serviço para seu controle
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa do Veiculo</FormLabel>
                  <FormControl>
                    <Input placeholder="Placa do Veiculo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordem de serviço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descreva o serviço a ser feito"
                      {...field}
                    />
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
