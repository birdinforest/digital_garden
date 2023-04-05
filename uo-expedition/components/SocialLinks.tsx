import React from 'react';
import socialStyles from '../styles/SocialLinks.module.css';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForumbee, faQq } from '@fortawesome/free-brands-svg-icons';
const SocialLinks: React.FC = () => {
    return (
        <div className={socialStyles.socialLinks}>
            {/* Add social icons and links here */}
            <a className={socialStyles.icon} href="https://trow.cc/board/showtopic=51584" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faForumbee} size="2x" color="#3A6EA5" />
            </a>
            <a className={socialStyles.icon} href="https://qm.qq.com/cgi-bin/qm/qr?k=cuFTyBTmDFtwQON0HgbEJgqpqd8UzrHk&jump_from=webapi&authKey=tMWq5ZsghhKE+cJnZIoBZRa/WrXWXcqrweZgdBXh+v6Nkp4X2GHNT5UKtyrCLiU9" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faQq} size="2x" color="#3A6EA5" />
            </a>
        </div>
    );
};

export default SocialLinks;
