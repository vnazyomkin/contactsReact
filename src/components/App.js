import React, {useEffect, useState} from 'react';

import Contacts from './Forms/Contacts';
import Modal from './Modal/Modal';
import classes from './App.module.css'

export default function App(props) {
    const [contacts, setContacts] = useState(props.contacts);
    const [addition, setAddition] = useState(false);
    const [editId, setEditId] = useState(null);
    const [modal, setModal] = useState(null);

    // useEffect(() => {
    //   async function getContacts() {
    //     const url = process.env.API_URL;
    //     const res = await fetch(url + 'contacts');
    //     const contacts = await res.json();
    //     setContacts(contacts);
    //   }
    //   //getContacts();
    // }, contacts);

    const createId = () => {
        return `f${(+new Date).toString(16)}`;
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
        const editContact = async function(data) {
            const res = await fetch(process.env.API_URL + `contacts/${id}`, {
                method: 'DELETE',
            });
            // const res = await fetch(process.env.API_URL + `contacts/${id}`, {
            //   method: 'PUT',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: data,
            // });
        }

        editContact(data);
    }

    const sortFun = (a,b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    }
    return (
        <>
            <main className={classes.main}>
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
            </main>
            {modal ? <Modal text={modal.text} resolve={modal.resolve} submit={deleteContact} closeModal={closeModal} id={modal.id}/> : null}
        </>
    );
}
