import { request } from "../../config/request";

export default {
  createComment: ({ payload }: any) =>
    request.post("/comments", { ...payload }),
};
