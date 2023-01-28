import PropTypes from 'prop-types';
import { ContactListItem } from '../ContactListItem/ContactListItem';

import css from './ContactList.module.css';

export const ContactList = ({ contacts, onClick }) => {
  if (contacts.length > 0) {
    return (
      <ul className={css.contactsList}>
        {contacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onClick={() => onClick(contact.id)}
          />
        ))}
      </ul>
    );
  } else {
    return <p className={css.noContactsText}>No contacts yet</p>;
  }
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onClick: PropTypes.func,
};
