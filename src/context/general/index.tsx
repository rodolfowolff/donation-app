import React, { useState, createContext, useContext, useCallback } from "react";
import * as ApiMethods from "../../services";

type ApiParams = {
  entity: string;
  action: string;
  payload: any;
  query: any;
  params: any;
  headers: any;
};

export type GeneralContextType = {
  api: ({
    entity,
    action,
    payload,
    query,
    params,
    headers,
  }: ApiParams) => Promise<{ data: any }>;
};

const GeneralContext = createContext<GeneralContextType>(
  {} as GeneralContextType
);

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const api = useCallback(
    async ({
      entity,
      action,
      payload = {},
      query,
      params,
      headers = {},
    }: ApiParams) => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        const response = await ApiMethods[entity][action](
          { payload, query, params },
          headers
        );

        return response;
      } catch (error: any) {
        console.info("API Error: ", error);
        throw error;
      }
    },
    []
  );

  const value = { api, theme, setTheme };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

const useGeneralContext = () => {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralProvider");
  }

  return context;
};

export { GeneralProvider, useGeneralContext };
