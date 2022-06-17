import { request } from "../../config/request";

export default {
  updateUser: ({ payload, params }: any) =>
    request.put(`/users/${params.id}`, { ...payload }),
};
