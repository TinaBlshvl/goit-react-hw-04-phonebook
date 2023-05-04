import css from '../Form/Form.module.css';
// import { Component } from 'react';
import { useState } from 'react';

export const Form = ({ formSubmit }) => {
  // state = {
  //   name: '',
  //   number: '',
  // };

  const [phoneName, setPhoneName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [value, setValue] = useState('');

  const sendNewContact = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;

    // this.props.onSubmit(this.state);
    formSubmit(phoneName, phoneNumber);

    setPhoneName('');
    setPhoneNumber('');

    name.value = '';
    number.value = '';
  };

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setPhoneName(value);
    } else if (name === 'number') {
      setPhoneNumber(value);
    }
  };

  return (
    <form action="" onSubmit={sendNewContact} className={css.form}>
      <h1 className={css.name}>Name</h1>
      <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        // value={setValue}
      />

      <h2 className={css.number}>Number</h2>
      <input
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        // value={setValue}
      />

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
