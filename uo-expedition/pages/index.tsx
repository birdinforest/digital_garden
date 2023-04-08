import type { NextPage } from 'next'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ServerStatistics from "../components/ServerStatistics";
import Image from "../components/Image";
// Import FontAwesomeIcon from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';
import SocialLinks from "../components/SocialLinks";
import { MusicPlayer } from "../components/MusicPlayer";

const players = [
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
];

const imageUrl = '/images/gypsyanimate-transparent-low.gif';
const logo = '/images/uo_expedition_logo_02_250_1C1818.jpg';

const Home: NextPage = () => {
  const [stats, setStats] = useState<string | undefined>(undefined);
  const [isFetchingStats, setIsFetchingStats] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to toggle audio playback
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const fetchServerStats = async () => {
    const username = 'your_username';
    const password = 'your_password';

    try {
      setIsFetchingStats(true);
      const response = await axios.post('/api/serverStats', {
        username,
        password,
      });

      setStats(response.data.data);
      setIsFetchingStats(false);
    } catch (error) {
      // @ts-ignore
      // setStats('Error: ' + error.message);
      setStats(undefined);
      setIsFetchingStats(false);
    }
  };

  // The server statistics will be fetched initially when the page loads and then every 5 minutes
  useEffect(() => {
    fetchServerStats(); // Fetch server statistics initially

    const interval = setInterval(() => {
      fetchServerStats(); // Fetch server statistics every 5 minutes
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  return (
  <div className={styles.container}>
    <MusicPlayer src={'/audio/stones.mp3'} loop={true} />

    <main className={styles.main}>
      <div className={styles.twoColumnLayout}>
        <div className={styles.leftColumn}>
          {/*<Logo />*/}
          <div className={styles.header}>
            <h2 className={`${styles.title} ${styles.textLight}`}>UO：Expedition(远征)</h2>
          </div>
          <p className={`${styles.textLight}`}>IP: 8.210.214.69:2593</p>
          <SocialLinks />
          <ServerStatistics isFetching={isFetchingStats} playerCount={stats} players={undefined} />
        </div>
        <div className={styles.rightColumn}>
          <Image src={imageUrl} alt="Image" />
        </div>
      </div>
    </main>
  </div>
  );
}

export default Home
