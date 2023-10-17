import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/server/firebase.config";
import { signInWithRedirect } from "firebase/auth";
import { Button } from "@/components/ui/button";
import "src/app/globals.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Login() {
  const [user, loading] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  const screenPersonal = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 rounded-md">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : user ? (
            <div>
              <Button onClick={screenPersonal}>
                <Avatar>
                  <AvatarImage src={user.photoURL}></AvatarImage>;
                </Avatar>
                Entrar com: {user.displayName}
              </Button>
            </div>
          ) : loading ? (
            <div className="spinner"></div>
          ) : (
            <Button onClick={signInWithGoogle}>Fazer login com Google</Button>
          )}
        </div>
      </div>
    </>
  );
}
