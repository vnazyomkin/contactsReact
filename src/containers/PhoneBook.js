import React, {useEffect, useState} from 'react';

import Contacts from '../components/Forms/Contacts';
import Modal from '../components/Modal/Modal';
import classes from './PhoneBook.module.css';

import {getData, putData} from '../fetch';

export default function PhoneBook() {
    const [contacts, setContacts] = useState(null);
    const [addition, setAddition] = useState(false);
    const [editId, setEditId] = useState(null);
    const [modal, setModal] = useState(null);

    const url = 'http://localhost:4200/';

    useEffect(() => {
        getData(url + 'contacts')
          .then(contacts => setContacts(contacts));
    }, []);

    const createId = () => {
        return `f${(+new Date()).toString(16)}`;
    };

    const turnOnAddition = () => {
        setAddition(true);
        setEditId(null);
    };

    const turnOffAddition = () => {
        setAddition(false);
    };

    const addContact = () => {
        alert('Новый контакт успешно добавлен');
    }

    const deleteContact = (id) => {
        alert(`Контакт "${contacts[id].name}" успешно удален`);
        closeModal();
    }

    const startToEdit = (id) => {
        setEditId(id);
        setAddition(false);
    }

    const cancelToEdit = (id) => {
        setEditId(null);
    }

    const showModal = (text, resolve, id) => {
        setModal({text, resolve, id});

    }

    const closeModal = () => {
        setModal(null);
    }

    const sendContact = (contact, id) => {
        const data = JSON.stringify({id: createId(), ...contact});
        putData(url + `contacts/${id}`, data)
            .then(() => getData(url + 'contacts'))
            .then(contacts => setContacts(contacts) );

    }

    const sortFun = (a,b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    }
    let contactList;
    if (contacts) {
        contactList = (
            <Contacts
                contacts={contacts.sort(sortFun)}
                addition={addition}
                editId={editId}
                turnOnAddition={turnOnAddition}
                turnOffAddition={turnOffAddition}
                addContact={addContact}
                startToEdit={startToEdit}
                cancelToEdit={cancelToEdit}
                showModal={showModal}
                closeModal={closeModal}
                sendContact={sendContact}/>
        );
    } else {
        contactList = <p>Загрузка</p>
    }
    return (
        <>
            <main className={classes.main}>
                {contactList}
            </main>
            {modal ? <Modal text={modal.text} resolve={modal.resolve} submit={deleteContact} closeModal={closeModal} id={modal.id}/> : null}
        </>
    );
}
