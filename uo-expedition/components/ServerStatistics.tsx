// components/ServerStatistics.tsx

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface Player {
    id: number;
    name: string;
}

interface ServerStatisticsProps {
    playerCount: string | undefined;
    players: Player[] | undefined;
    isFetching: boolean;
}

const ServerStatistics: React.FC<ServerStatisticsProps> = (
  {playerCount, players, isFetching}
) => {
    return (
        <div>
            {isFetching
                ? <h3 className={`${styles.textLight}`}>正在获取服务器状态...</h3>
                : <div>
                    <h3 className={`${styles.textLight}`}>
                        状态：{playerCount === undefined
                        ? <span className={styles.colourFail}>离线</span>
                        : <span className={styles.colourSuccess}>在线</span>}
                    </h3>
                    {playerCount != undefined &&
                      <div>
                        <h3 className={`${styles.textLight}`}>{playerCount}</h3>
                          {players &&
                            <div>
                              <h3 className={`${styles.textLight}`}>在线列表:</h3>
                                <ul className={styles.list}>
                                    {players.map((player) => (
                                        <li key={player.id} className={`${styles.listItem} ${styles.textLight}`}>{player.name}</li>
                                    ))}
                                </ul>
                            </div>
                          }
                      </div>
                    }
                 </div>
            }
        </div>
    );
};

export default ServerStatistics;
