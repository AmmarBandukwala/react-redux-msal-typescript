import React from "react";
import { useMsal, MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";

interface Prop{
    children: React.ReactNode
}
export const AuthProvider: React.FC<Prop> = ({ children }) => {
    const { instance } = useMsal();
  
    return (
      <MsalProvider instance={instance}>
        {children}
      </MsalProvider>
    );
  };