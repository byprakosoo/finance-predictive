export type ServerUser = {
  id: string;
  email: string;
  name: string;
};

export async function requireUser(): Promise<ServerUser> {
  return {
    id: "demo-user",
    email: "alex@example.com",
    name: "Alex Investor",
  };
}
