
export interface User {
  id: string ;
  name: string | null;
  email: string;
  emailVerified: Date | null;

  role: string;
  image: string |  null;
  createdAt: Date  | null;
  updatedAt: Date | null;
}
