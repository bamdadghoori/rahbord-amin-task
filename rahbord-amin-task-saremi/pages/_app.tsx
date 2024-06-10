import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import TasksProvider from "@/contexts/tasksContext";

export default function App({ Component, pageProps }: AppProps) {
  return(<>
 <TasksProvider>
  <Component {...pageProps} />
  </TasksProvider>
  </>) 
}
