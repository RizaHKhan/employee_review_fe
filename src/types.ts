export type User = {
  email: string;
  password: string;
  role: "admin" | "manager" | "employee";
};
