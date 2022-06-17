import { request } from "../../config/request";

export default {
  createDonaiton: ({ payload }: any) =>
    request.post(`/donations`, { ...payload }),
};
