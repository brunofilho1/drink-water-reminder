import { ReactTimer } from "../components/ReactTimer";

export default function HomeScreen() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5); // 10 minutes timer

  Notification.requestPermission().then(function (permission) {
    console.log(permission);
  });

  return (
    <>
      <main className="home-main">
        <h1 className="home-title">
          Drink <a href="/">Water</a> Reminder 💧
        </h1>

        <p className="home-title-description">
          Never forget to drink water again.
        </p>

        <div className="waterTimer">
          <ReactTimer expiryTimestamp={time} />
        </div>
      </main>

      <footer className="home-footer">
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
    </>
  );
}
