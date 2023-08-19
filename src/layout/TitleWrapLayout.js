import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const name = "XYZ Engine";
export const siteTitle = "XYZ Engine";

const TitleWrapLayout = ({ children }) => {
  const { headTitle } = useSelector(({ extra }) => extra);
  return (
    <div>
      <Head>
        <meta
        // property="og:image"
        // content={`https://og-image.vercel.app/${encodeURI(
        //   siteTitle
        // )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <title>{`${headTitle ?? name}`}</title>
      </Head>
      {children}
    </div>
  );
};

export default TitleWrapLayout;
