import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home: NextPage = () => {
  const [stats, setStats] = useState('');

  const fetchServerStats = async () => {
    const username = 'your_username';
    const password = 'your_password';

    try {
      const response = await axios.post('/api/serverStats', {
        username,
        password,
      });

      setStats(response.data.data);
    } catch (error) {
      // @ts-ignore
      setStats('Error: ' + error.message);
    }
  };

  useEffect(() => {
    fetchServerStats();
  }, []);

  return (
      <div>
        <h1>RunUO Server Statistics</h1>
        <pre>{stats}</pre>
      </div>
  );
}

export default Home
