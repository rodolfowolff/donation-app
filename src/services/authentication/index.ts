import { request } from "../../config/request";

interface IAddressRegister {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  document: string;
  birthDate: string;
  address: IAddressRegister;
}

export default {
  userLogin: ({ payload }: any) => request.post("/users/login", { ...payload }),
};
