import { handler } from "../../dist/server/index.js";

export const handler = async (event, context) => {
  // This is a basic wrapper; depending on the TanStack Start version,
  // it might need more sophisticated request/response translation.
  return handler(event, context);
};
