import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from '../reducers/filter-reducer';

const Filter = ({ changeFilter }) => {
  const handleFilter = (e) => {
    changeFilter(e.target.value);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      <h3>filter</h3>
      <input onChange={handleFilter}/>
    </div>
  );
};

const mapDispatchToProps = {
  changeFilter
};

export default connect(
  null,
  mapDispatchToProps
)(Filter);
