import { request } from "../../config/request";

export default {
  checkDocumentUser: ({ payload }: any) =>
    request.post("/users/check", { ...payload }),

  checkDocumentOng: ({ payload }: any) =>
    request.post("/ongs/check", { ...payload }),

  loginUser: ({ payload }: any) => request.post("/users/login", { ...payload }),

  loginOng: ({ payload }: any) => request.post("/ongs/login", { ...payload }),
};
