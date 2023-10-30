import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/server/firebase.config";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Button } from "@/components/ui/button";
import "src/app/globals.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Login() {
  const [user, loading] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const screenPersonal = () => {
    window.location.href = "/";
  };

  const returnAcess = () => {
    return auth.signOut();
  };

  function getInitials(displayName: string | null): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-full-screen">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="p-4 rounded-md ">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : user ? (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Olá, {user.displayName}</CardTitle>
                  <CardDescription>
                    Confirme o dominio da sua conta do Google.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center ">
                  <Button onClick={screenPersonal} className="h-15">
                    <Avatar className="right-2">
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL}></AvatarImage>
                      ) : (
                        <div className="initials">
                          {getInitials(user.displayName)}
                        </div>
                      )}
                    </Avatar>
                    Entrar com: {user.displayName}
                  </Button>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <CardDescription className="CardFooterBtnReturnAcess">
                    <span className="SpanBtnReturnAcess">
                      Para retornar à tela de login
                    </span>
                    <a className="btnReturnAcess" onClick={returnAcess}>
                      Clique Aqui.
                    </a>
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
          ) : loading ? (
            <div className="spinner"></div>
          ) : (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Bem vindo,</CardTitle>
                  <CardDescription>
                    Clique abaixo para fazer login com sua conta Google.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-center ">
                  <Button onClick={signInWithGoogle}>
                    Fazer login com Google
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
