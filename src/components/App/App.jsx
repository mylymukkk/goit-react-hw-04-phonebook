import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      isFirstRender.current = false;

      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const newContact = { id: nanoid(), name: name, number: number };

    contacts.find(contact => contact.name === name)
      ? window.alert(`${name} is alredy in contacts.`)
      : setContacts(prevState => [...prevState, newContact]);
  };

  const filterToLowerCase = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <div className={css.phonebookWraper}>
        <h1 className={css.mainHeader}>Phonebook</h1>
        <ContactForm onSubmit={addContacts} />
        <h2 className={css.sectionHeader}>Contacts</h2>
        <Filter onChange={filterToLowerCase} />
        <ContactList contacts={filterContacts()} onClick={deleteContact} />
      </div>
    </div>
  );
};
