export interface UserProps {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  idCard: string;
  password: string;
  roles: Array<string | number>;
}
