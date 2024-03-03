import React from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Commission calculator simulator</title>
      </Head>
      <main className={inter.className}>{children}</main>
    </>
  );
};

export default Layout;
