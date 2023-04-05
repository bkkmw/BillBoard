import { persistor } from "../store/store";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const doLogOut = async () => {
  await sleep(1000);
  persistor.purge();
};
