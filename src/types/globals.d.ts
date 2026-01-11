export {};

declare global {
  interface CustomeJwtSessionClaims {
    metadata: {
      role?: "admin" | "user";
    };
  }
}
