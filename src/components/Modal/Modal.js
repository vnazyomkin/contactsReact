import React from 'react';
import classes from './Modal.module.scss'

export default function Modal(props) {
    return (
        <div className={classes.background}>
            <div className={classes.window}>
                <p>{props.text}</p>
                <button type='submit' onClick={props.submit}>{props.resolve}</button>
                <button type='button' onClick={props.closeModal}>Отмена</button>
            </div>
        </div>
    );
}