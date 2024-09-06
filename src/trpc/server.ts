import { headers } from "next/headers";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";

const createContext = async () => {
  return createTRPCContext({
    headers: headers(),
  });
};

export const api = appRouter.createCaller(await createContext());

// Remove the createHydrationHelpers usage
