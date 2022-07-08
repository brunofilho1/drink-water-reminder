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
  const [isPaused, setIsPaused] = useState(false);
  const [isStoped, setIsStoped] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [timerTime, setTimerTime] = useState<number>(5);
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
      const time = new Date();
      time.setSeconds(time.getSeconds() + timerTime);
      restart(time);
      console.warn("HORA DE BEBER ÁGUA");
      setAudioUrl("/sounds/alarm.mp3");
      toggleSound();
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

  function restartFunc() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerTime);
    restart(time);
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
        src={audioUrl}
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
                restartFunc();
                setIsStoped(false);
                setAudioUrl("/sounds/click.mp3");
                toggleSound();
              }}
              title="Iniciar"
            >
              {<RiPlayFill /> /* Iniciar */}
            </button>
          )}

          {isPaused && (
            <>
              <button
                onClick={() => {
                  setIsPaused(false);
                  setAudioUrl("/sounds/click.mp3");
                  toggleSound();
                  resume();
                }}
                title="Continuar"
              >
                <RiSkipForwardFill />
              </button>
              <button
                title="Reiniciar"
                onClick={() => {
                  setAudioUrl("/sounds/click.mp3");
                  toggleSound();
                  restartFunc();
                }}
              >
                <RiRepeatFill />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="timer-buttons">
          <button
            onClick={() => {
              setIsPaused(false);
              restartFunc();
              pause();
              setIsStoped(true);
              setAudioUrl("/sounds/click.mp3");
              toggleSound();
            }}
            title="Parar"
          >
            <RiStopFill />
          </button>
          <button
            onClick={() => {
              setIsPaused(true);
              setAudioUrl("/sounds/click.mp3");
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
              setAudioUrl("/sounds/click.mp3");
              toggleSound();
              restartFunc();
            }}
          >
            <RiRepeatFill />
          </button>
        </div>
      )}
    </div>
  );
}
