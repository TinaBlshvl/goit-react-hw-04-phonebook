import { Section } from 'components/Section/Section';
import { Form } from 'components/Form/Form';
import { Contscts } from 'components/Contacts/Contacts';

// import { Component } from 'react';
import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

const KEY = 'contacts';

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(KEY));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  const formSubmit = (name, number) => {
    const checkedName = contacts.find(elem => {
      return elem.name === name;
    });

    if (checkedName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    // this.setState(prevState => {
    //   const ContactsAll = [...prevState.contacts];
    //   ContactsAll.push(newContact);
    //   return {
    //     name,
    //     number,
    //     contacts: [...ContactsAll],
    //   };

    setContacts(prevContacts => {
      // const newContacts = {
      //   contacts: [...ContactsObj],
      // };

      let contacstArray = [...prevContacts, newContact];

      const contactsArrayJson = JSON.stringify(contacstArray);

      localStorage.setItem(KEY, contactsArrayJson);

      return contacstArray;
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('App component');

  //   if (this.state.contacts !== prevState.contacts) {
  //     console.log('Обновилось поле');

  //     localStorage.setItem('KEY', JSON.stringify(this.state.contacts));
  //   }
  // }

  const deleteItem = id => {
    setContacts(prevContacts => {
      const newContacts = [...prevContacts];
      const index = newContacts.findIndex(elem => elem.id === id);
      newContacts.splice(index, 1);

      // const result = {
      //   contacts: [...newContacts],
      // };

      const contactsArrayJson = JSON.stringify(newContacts);

      localStorage.setItem(KEY, contactsArrayJson);

      return newContacts;
    });
  };

  const onFilterSearch = e => {
    setFilter(e.target.value);
  };

  const filteredSearch = () => {
    const normaliseFilter = filter.toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(normaliseFilter)
    );
  };

  return (
    <div>
      <Section title="Phonebook" />
      <Form formSubmit={formSubmit} />
      <Contscts
        contacts={filteredSearch()}
        filter={filter}
        onFilter={onFilterSearch}
        deleteItem={deleteItem}
      />
    </div>
  );
};
