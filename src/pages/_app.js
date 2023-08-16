// import "@/styles/globals.css";
import { IconoirProvider } from "iconoir-react";
import { store } from "@redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <IconoirProvider
        iconProps={{
          strokeWidth: 1.5,
          width: "1rem",
          height: "1rem",
        }}
      >
        <Component {...pageProps} />
      </IconoirProvider>
    </Provider>
  );
}
