import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import classes from './EditContactFrom.module.scss'

export default function EditContactForm(props) {
  const names = [];
  props.contacts.forEach(contact => {
    names.push(contact.name);
  });

  const validationSchema = Yup.object({
      name: Yup.mixed()
          //.min(3, 'Имя должно быть больше 2 символов')
          .required('Имя обязательно для заполнения')
          .notOneOf(names, "Данное имя уже есть"),
      phone: Yup.string()

  });

  return (
    <Formik
      initialValues={{name: props.name, phone: props.phone}}
      validationSchema={validationSchema}
      onSubmit={values => {
        props.showModal({...props.modal, submit: () => props.submit(values, props.id)});
      }}
    >
      <Form>
        <Field name="name" type="text" placeholder="Имя"/>
        <ErrorMessage name="name" />
        <Field name="phone" type="text" placeholder="Телефон"/>
        <ErrorMessage name="phone" />
        <button type="submit" className={classes.button}>Сохранить</button>
        <button type="button" className={classes.button} onClick={props.cancel}>Отмена</button>
      </Form>
    </Formik>
  );
};