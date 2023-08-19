import "@styles/index.css";
import { IconoirProvider } from "iconoir-react";
import { store } from "@redux/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import TitleWrapLayout from "src/layout/TitleWrapLayout";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00A368",

          fontFamily: "Poppins, sans-serif",
          // paddingLG: "24px",
          // paddingMD: "16px",
          // paddingSM: "12px",
          // paddingXS: "8px",
          // paddingXXS: "4px",
          // marginLG: "24px",
          // marginMD: "16px",
          // marginSM: "12px",
          // marginXS: "8px",
          // marginXXS: "4px",
          // lineHeightLG: "44px",
          // lineHeightSM: "24px",
        },
      }}
    >
      <Provider store={store}>
        <IconoirProvider
          iconProps={{
            strokeWidth: 1.5,
            width: "1rem",
            height: "1rem",
          }}
        >
          <TitleWrapLayout>
            <Component {...pageProps} />
          </TitleWrapLayout>
        </IconoirProvider>
      </Provider>
    </ConfigProvider>
  );
}
