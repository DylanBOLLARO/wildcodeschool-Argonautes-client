import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{"Argonautes"}</title>
        <meta name="Argonautes" content="Wildcodeschool-Argonautes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header className="flex flex-row bg-[#f4f4f4] py-10 justify-center gap-3 font-[Roboto]">
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
            className="object-contain max-w-[96px]"
          />
          <h1 className="font-poppins text-4xl font-bold">Les Argonautes</h1>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="bg-[#f76c6c] text-white text-center py-3">
          <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
        </footer>
      </div>
    </>
  );
}
