import type { NextPage } from "next";
import Head from "next/head";
import HomeScreen from "./Home";

const Home: NextPage = () => {
  return (
    <div className="home-container">
      <Head>
        <title>Drink Water Reminder!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alatsi:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <HomeScreen />
    </div>
  );
};

export default Home;
