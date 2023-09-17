import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { firestore } from "../../server/firestore";
import { collection, addDoc } from "@firebase/firestore";

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
  const cards = collection(firestore, "cards");

  const schema = z.object({
    title: z.string().nonempty().max(20),
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

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log("called");
    addDoc(cards, values);
    close();
  };

  return (
    <Dialog open={show} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>teste</DialogDescription>
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
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
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
