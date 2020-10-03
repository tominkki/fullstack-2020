import React from 'react';

const FilterPeople = ({
  filter,
  handleFilterChange
}) =>(
  <>
    <h3>Filter people by name</h3>
    <form>
      <div>
        name: <input value = {filter}
          onChange = {handleFilterChange}/>
      </div>
    </form>
  </>
);

export default FilterPeople;