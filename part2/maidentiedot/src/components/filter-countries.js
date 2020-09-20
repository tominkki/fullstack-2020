import React from 'react';

const FilterCountries = ({filter, handleFilterChange})=>(
    <>
    <form>
        <div>
            Find countries: <input value = {filter}
            onChange = {handleFilterChange}/>
        </div>
    </form>
    </>
);

export default FilterCountries;