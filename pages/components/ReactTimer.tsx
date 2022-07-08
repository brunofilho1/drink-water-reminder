import { useTimer } from "react-timer-hook";
import {
  RiPauseFill,
  RiPlayFill,
  RiRepeatFill,
  RiSkipForwardFill,
  RiStopFill,
} from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export function ReactTimer({ expiryTimestamp }: any) {
  const [expired, setExpired] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStoped, setIsStoped] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
    autoStart: false,
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

  function setPlayingState(state: any) {
    setIsPlaying(state);
  }
  function toggleSound() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      // @ts-ignore
      audioRef.current.play();
    } else {
      // @ts-ignore
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="react-timer-container">
      <audio
        src={"/sounds/click.mp3"}
        autoPlay={true}
        ref={audioRef}
        onPlay={() => setPlayingState(true)}
        onPause={() => setPlayingState(false)}
      />

      <div className="react-timer-clock">
        <span>{returnTime(hours) + hours}</span>:
        <span>{returnTime(minutes) + minutes}</span>:
        <span>{returnTime(seconds) + seconds}</span>
      </div>

      {!isRunning ? (
        <div className="timer-buttons">
          {!isPaused && (
            <button
              onClick={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 600);
                restart(time);
                setIsStoped(false);
                toggleSound();
              }}
              title="Iniciar"
            >
              {<RiPlayFill /> /* Iniciar */}
            </button>
          )}

          {!isStoped && (
            <button
              onClick={() => {
                setIsPaused(false);
                toggleSound();
                resume();
              }}
              title="Continuar"
            >
              <RiSkipForwardFill />
            </button>
          )}
        </div>
      ) : (
        <div className="timer-buttons">
          <button
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + 600);
              setIsPaused(false);
              restart(time);
              pause();
              setIsStoped(true);
              toggleSound();
            }}
            title="Parar"
          >
            <RiStopFill />
          </button>
          <button
            onClick={() => {
              setIsPaused(true);
              toggleSound();
              pause();
            }}
            title="Pausar"
          >
            <RiPauseFill />
          </button>
          <button
            title="Reiniciar"
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + 600);
              toggleSound();
              restart(time);
            }}
          >
            <RiRepeatFill />
          </button>
        </div>
      )}
    </div>
  );
}
