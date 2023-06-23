import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <Spinner animation="grow"/>
        </div>
    );
};
