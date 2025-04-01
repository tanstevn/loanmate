import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserIdContext } from "./utils/contexts";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

const Providers = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<any>(null);
  const queryClient = makeQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserIdContext.Provider value={{ userId, setUserId }}>
        {children}
      </UserIdContext.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
