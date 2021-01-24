import React from 'react';
import classes from "../Modal/Modal.module.scss";

export default function Spinner() {
    return (
        <div className={classes.background}>
            <div className={classes.window}>
                <p>Загрузка</p>
            </div>
        </div>
    );
}