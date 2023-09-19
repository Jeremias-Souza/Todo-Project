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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Login({ show }: ItemFormDialogProps) {
  const schema = z.object({
    login: z.string().nonempty().max(29),
    password: z.string().min(10),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  function validation() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider);
  }

  return (
    <Dialog open={show}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Clinicorp</DialogDescription>
          <br></br>
          <DialogDescription>
            Para continuar, é necessario fazer login!
          </DialogDescription>
          <br></br>
        </DialogHeader>

        <Form {...form}>
          <form id="insert-form" className="space-y-8">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button form="insert-form" onClick={validation}>
          Entrar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
