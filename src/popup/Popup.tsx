import React,{FC} from 'react';
import styles from './popup.module.scss'

const Popup:FC = () => {
    return (
        <div className={styles.main}>
            <h1>Chrome Ext - Popup</h1>
            {new Date().toLocaleDateString()}
        </div>
    )
}

export default Popup;