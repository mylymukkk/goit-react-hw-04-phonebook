import PropTypes from 'prop-types';

import css from './Filter.module.css';

export const Filter = ({ onChange }) => {
  return (
    <div className={css.filter}>
      <label className={css.filterLabel} htmlFor="findByName">
        Find contacts by name
      </label>
      <input
        className={css.filterInput}
        type="text"
        id="findByName"
        name="filter"
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func,
};
