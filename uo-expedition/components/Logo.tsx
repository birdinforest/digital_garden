// components/Logo.tsx

import React from 'react';
import styles from '../styles/Logo.module.css';

const Logo: React.FC = () => {
    return (
        <img className={styles.logo} src="/images/uo_expedition_logo_02_250_1C1818.jpg" alt="Expedition Logo" />
    );
};

export default Logo;
