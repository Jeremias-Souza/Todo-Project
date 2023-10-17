import React, { useEffect, useState } from "react";
import { RouteProps } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/server/firebase.config";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!user || loading);
  }, [user, loading]);

  if (isAuthenticated === null) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  return <>{children}</>;
};

export default PrivateRoute;
