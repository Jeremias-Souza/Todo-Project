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

export type ItemFoRegisterServiceProps = {
  show: boolean;
  close: () => void;
};

export default function ItemRegisterService({
  show,
  close,
}: ItemFoRegisterServiceProps) {
  const schema = z.object({
    valueService: z.string().min(1).max(100),
    servicePerfomed: z.string().min(1).max(100),
    guarantee: z.string().min(1).max(15),
    createdAt: z.string().length(13),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      valueService: "",
      servicePerfomed: "",
      guarantee: "",
      createdAt: new Date().getTime().toString(),
    },
  });

  const onSubmit = (value: z.infer<typeof schema>) => {
    FirestoreService.insert("serviceOrder", value);
    clearFormAndCloseModal();
  };

  function clearFormAndCloseModal() {
    form.reset();
    close();
  }

  const guarantee = document.getElementById("guarantee") as HTMLInputElement;
  if (guarantee) {
    VanillaMasker(guarantee).maskPattern("9 AAAAA");
  }

  const valueService = document.getElementById(
    "valueService"
  ) as HTMLInputElement;
  if (valueService) {
    VanillaMasker(valueService).maskPattern("9.999,0");
  }
  return (
    <div className="flex items-center justify-center">
      <Dialog open={show} onOpenChange={clearFormAndCloseModal}>
        <DialogContent className="sm:max-w-[425px] max-h-screen mt-5 overflow-auto">
          <DialogHeader>
            <DialogTitle>Novo Cadastro</DialogTitle>
            <DialogDescription>
              Crie um novo cadastro de serviço prestado
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="servicePerfomed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serviço Realizado:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="servicePerfomed"
                        placeholder="Serviço Realizado:"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guarantee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo de Garantia:</FormLabel>
                    <FormControl>
                      <Input
                        id="guarantee"
                        placeholder="Tempo de Garantia:"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valueService"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Serviço:</FormLabel>
                    <FormControl>
                      <Input
                        id="valueService"
                        placeholder="Valor do Serviço:"
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
