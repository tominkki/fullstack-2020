import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = '';

const setToken = userToken => {
  token = `bearer ${userToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async newObj => {
  const conf = {
    headers: {Authorization: token},
  };
  const res = await axios.post(baseUrl, newObj, conf);
  return res.data;
};

const update = async (newObj, id) => {
  const conf = {
    headers: {Authorization: token}
  };
  const res = await axios.put(`${baseUrl}/${id}`, newObj, conf);
  return res.data;
};

const remove = async (id) => {
  const conf = {
    headers: {Authorization: token}
  };
  const res = await axios.delete(`${baseUrl}/${id}`, conf);
  return res.data;
};

export default { setToken, getAll, create, update, remove };