import { createContext, useState } from "react";
import { useQuery } from "react-query";

export type BookType = {
  url: string;
  title: string;
  author: string;
  rating: number;
  genre: string[];
  quantity: number;
  reviews: string;
  description: string;
};
type ContextType = {
  name: string;
  isLoading: boolean;
  error: unknown;
  data: BookType[];
};
const StoreContext = createContext<Partial<ContextType>>({});

function StoreProvider({ children }: { children: JSX.Element }) {
  const [name, setName] = useState<string>("Bhaumik");

  const { isLoading, error, data } = useQuery({
    queryKey: ["storeData"],
    // queryFn: () => fetch("store_full.json").then((res) => res.json()),
    queryFn: () =>
      fetch("https://b5oz5e5ii3.execute-api.ap-south-1.amazonaws.com/getMine").then((res) => res.json()),
  });

  return (
    <StoreContext.Provider value={{ name, isLoading, error, data }}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
