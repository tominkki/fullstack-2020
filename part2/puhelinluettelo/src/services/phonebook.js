import axios from 'axios';

const db_url = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(db_url);
    return request.then(response => response.data);
}

const postNew = newObject => {
    const request = axios.post(db_url, newObject);
    return request.then(response => response.data);
}

const deletePerson = id => {
    const request = axios.delete(`${db_url}/${id}`);
    return request.then(response => response.data);
}

const updateContact = newObj => {
    const request = axios.put(`${db_url}/${newObj.id}`, newObj);
    return request.then(response => response.data);
}

export default {getAll, postNew, deletePerson, updateContact};