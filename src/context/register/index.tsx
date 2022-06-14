import React, { useState, createContext, useContext } from "react";

interface IAddressData {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface IUserPersonalData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  document: string;
  birthDate: string;
  telephone: string;
}

interface IOngPersonalData {
  name: string;
  password: string;
  email: string;
  document: string;
  description: string;
  telephone: string;
}

export type RegisterContextType = {
  userPersonalData: IUserPersonalData;
  setUserPersonalData: React.Dispatch<React.SetStateAction<IUserPersonalData>>;
  ongPersonalData: IOngPersonalData;
  setOngPersonalData: React.Dispatch<React.SetStateAction<IOngPersonalData>>;
  addressData: IAddressData;
  setAddressData: React.Dispatch<React.SetStateAction<IAddressData>>;
  resetState: () => void;
};

const RegisterContext = createContext<RegisterContextType>(
  {} as RegisterContextType
);

const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [userPersonalData, setUserPersonalData] = useState<IUserPersonalData>(
    {} as IUserPersonalData
  );
  const [ongPersonalData, setOngPersonalData] = useState<IOngPersonalData>(
    {} as IOngPersonalData
  );
  const [addressData, setAddressData] = useState<IAddressData>(
    {} as IAddressData
  );

  const resetState = () => {
    setUserPersonalData({} as IUserPersonalData);
    setOngPersonalData({} as IOngPersonalData);
    setAddressData({} as IAddressData);
  };

  const value = {
    userPersonalData,
    setUserPersonalData,
    ongPersonalData,
    setOngPersonalData,
    addressData,
    setAddressData,
    resetState,
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegister = () => {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }

  return context;
};

export { RegisterProvider, useRegister };
