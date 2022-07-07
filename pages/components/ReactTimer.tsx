import { useTimer } from "react-timer-hook";
import {
  RiPlayFill,
  RiRepeatFill,
  RiSkipForwardFill,
  RiStopFill,
} from "react-icons/ri";
import { useState } from "react";

export function ReactTimer({ expiryTimestamp }: any) {
  const [expired, setExpired] = useState(false);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setExpired(true);
      console.warn("onExpire called");
    },
  });

  const returnTime = (time: number) => {
    let newTime;
    if (String(time).length === 1) {
      newTime = "0";
    } else {
      newTime = "";
    }

    return newTime;
  };

  return (
    <div className="react-timer-container">
      <div className="react-timer-clock">
        <span>{returnTime(hours) + hours}</span>:
        <span>{returnTime(minutes) + minutes}</span>:
        <span>{returnTime(seconds) + seconds}</span>
      </div>

      {!isRunning ? (
        <div className="timer-buttons">
          <button onClick={start} title="Iniciar">
            {<RiPlayFill /> /* Iniciar */}
          </button>
          <button onClick={resume} title="Continuar">
            <RiSkipForwardFill />
            {/* Continuar */}
          </button>
        </div>
      ) : (
        <div className="timer-buttons">
          <button onClick={pause} title="Pausar">
            <RiStopFill />
            {/* Pausar */}
          </button>
          <button
            title="Reiniciar"
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + 600);
              restart(time);
            }}
          >
            <RiRepeatFill />
            {/* Reiniciar */}
          </button>
        </div>
      )}
    </div>
  );
}