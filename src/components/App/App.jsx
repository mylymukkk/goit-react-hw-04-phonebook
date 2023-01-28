import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ name, number }) => {
    const newContact = { id: nanoid(), name: name, number: number };

    this.state.contacts.find(contact => contact.name === name)
      ? window.alert(`${name} is alredy in contacts.`)
      : this.setState(prevState => {
          return { contacts: [...prevState.contacts, newContact] };
        });
  };

  filterToLowerCase = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value.toLowerCase() });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <div className={css.container}>
        <div className={css.phonebookWraper}>
          <h1 className={css.mainHeader}>Phonebook</h1>
          <ContactForm onSubmit={this.addContacts} />
          <h2 className={css.sectionHeader}>Contacts</h2>
          <Filter onChange={this.filterToLowerCase} />
          <ContactList
            contacts={this.filterContacts()}
            onClick={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
