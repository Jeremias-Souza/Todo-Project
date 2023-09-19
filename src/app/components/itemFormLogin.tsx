import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Form } from "react-hook-form";

export default function Login() {
  return (
    <>
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Clinicorp</DialogDescription>
          </DialogHeader>

          <Form>
            <form></form>
          </Form>
          <Button form="insert-form" type="submit">
            Salvar
          </Button>
        </DialogContent>
      </Dialog>
      ;
    </>
  );
}
