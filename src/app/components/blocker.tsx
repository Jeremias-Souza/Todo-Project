import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/server/firebase.config";
import { signInWithRedirect } from "firebase/auth";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Blocker() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="iconButton">
      {user ? (
        <Button onClick={signOut}>
          <LogOut />
          LogOut
        </Button>
      ) : (
        <Button onClick={signInWithGoogle}>
          <LogIn />
          Login
        </Button>
      )}
    </div>
  );
}
