import { request } from "../../config/request";

export default {
  registerUser: ({ payload }: any) =>
    request.post("/users/register", { ...payload }),

  registerOng: ({ payload }: any) =>
    request.post("/ongs/register", { ...payload }),
};
