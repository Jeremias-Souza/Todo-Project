import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/server/firebase.config";
import { signInWithRedirect } from "firebase/auth";
import { Link, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Login() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
    window.location.href = "/";
  };

  return (
    <div className="iconButton">
      <Button onClick={signInWithGoogle}>
        <LogIn />
        Login
      </Button>
    </div>
  );
}
