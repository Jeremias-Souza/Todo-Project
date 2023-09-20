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

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Login({ show }: ItemFormDialogProps) {
  return (
    <>
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

          <Button form="insert-form">Entrar</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
