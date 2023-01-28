import PropTypes from 'prop-types';

import css from './ContactListItem.module.css';

export const ContactListItem = ({ contact, onClick }) => {
  const { name, number } = contact;
  return (
    <li className={css.item}>
      <button className={css.deleteBtn} type="button" onClick={onClick}>
        ✖
      </button>
      {name}: <span className={css.phoneNumber}>{number}</span>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
