import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../reducers/filter-reducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(changeFilter(e.target.value));
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

export default Filter;
