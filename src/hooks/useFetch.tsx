import useSWR, { useSWRConfig } from "swr";
import { request } from "../config/request";

export { useSWRConfig };

export default (url: string | null) => {
  const { data, error, isValidating } = useSWR(
    url,
    async (url: string) => {
      const response = await request.get(url);
      return response.data;
    },
    {
      revalidateOnReconnect: true, //revalidate on reconnect to server if user disconnected internet connection
      revalidateOnFocus: true, //revalidate on focus to component if user moved to another tab or window
    }
  );
  return { data, error, isValidating };
};
