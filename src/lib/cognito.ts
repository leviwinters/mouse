import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

export const userPool = new CognitoUserPool(poolData);

export function signOut() {
  const user = userPool.getCurrentUser();
  if (user) user.signOut();
}

export function getCurrentUser() {
  return userPool.getCurrentUser();
}

export const signUp = (
  name: string,
  email: string,
  password: string
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({ Name: "name", Value: name }),
    ];
    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

export const login = (
  email: string,
  password: string
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });

export const confirmSignUp = (
  email: string,
  code: string
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    user.confirmRegistration(code, true, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
