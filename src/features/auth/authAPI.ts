import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import { loginSuccess, logoutSuccess } from "./authSlice";

const msalConfig = {
  auth: {
    clientId: "<Your_Client_Id>",
    authority: "<Your_Authority>",
    redirectUri: window.location.origin,
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};

const publicClientApplication = new PublicClientApplication(msalConfig);

export async function login(): Promise<AccountInfo | undefined> {
  try {
    var response = await publicClientApplication.loginPopup();
    if (response.account) {
      return response.account;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

export async function logout() {
  return await publicClientApplication.logoutRedirect();
}

export function handleRedirect() {
  return new Promise<void>(() => {});
}
