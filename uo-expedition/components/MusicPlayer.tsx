import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import * as gtag from "../../lib/gtag";

interface MusicPlayerProps {
  src: string;
  loop?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = (
  {src, loop}
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playTime, setPlayTime] = useState<number | null>(null);

  // Function to toggle audio playback
  const togglePlayback = () => {
    if (audioRef.current) {
      let time = 0;
      if (isPlaying) {
        audioRef.current.pause();
        setPlayTime(Date.now());
      } else {
        audioRef.current.play();
        setPlayTime(null);
        time = Date.now() - playTime!;
      }
      setIsPlaying(!isPlaying);
      gtag.event({
        action: 'click',
        category: 'Music Player',
        label: isPlaying ? 'Pause' : 'Play',
        value: time,
      });
    }
  };

  return (
    <>
      {/* Update the audio element */}
      <audio ref={audioRef} src={src} loop={loop} />
      {/* Add a mini player button */}
      <button onClick={togglePlayback} className={styles.miniPlayer}>
        <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} />
      </button>
    </>
  )
}
