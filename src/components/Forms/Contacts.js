import React, {Fragment} from 'react';
import classes from './Contacts.module.scss'
import EditContactForm from './EditContactForm';

export default function Contacts(props) {
    const contacts = props.contacts.map( (contact, i) => (
        <Fragment key={contact.id}>
            <div className={classes.line}>
                <div className={classes.item}>{contact.name}</div>
                <div className={classes.item}>{contact.phone}</div>
                <button 
                    type="button" 
                    className={[classes.item, classes.button].join(' ')} 
                    onClick={() => props.startToEdit(i)}
                    >Редактировать</button>
                <button 
                    type="button" 
                    className={[classes.item, classes.button].join(' ')} 
                    onClick={() => props.showModal(`Вы действительно хотите удалить контакт "${contact.name}" из списка контактов?`, 'Да', i)}
                >Удалить</button>
            </div>
            {props.editId === i ? <EditContactForm name={contact.name} phone={contact.phone} cancel={props.cancelToEdit} contacts={props.contacts} sendContact={props.sendContact} id={contact.id}/> : null}
        </Fragment>
    ));
    return (
        <>
            {contacts}
            <button type="button" className={classes.button} onClick={props.turnOnAddition}>Добавить контакт</button>
            {props.addition ? <EditContactForm cancel={props.turnOffAddition} contacts={props.contacts} sendContact={props.sendContact} id={null}/> : null}
        </>
    );
}