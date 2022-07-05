import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Drink Water Reminder!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Drink <a href="/">Water</a> Reminder 💧
        </h1>

        <p className={styles.description}>Never forget to drink water again.</p>

        <div className={styles.grid}>
          <a href="/" className={styles.card}>
            <h2>Iniciar</h2>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Drink Water Reminder by
        <a
          href="https://github.com/brunofilho1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bruno Filho
        </a>
        😎💧
      </footer>
    </div>
  );
};

export default Home;
