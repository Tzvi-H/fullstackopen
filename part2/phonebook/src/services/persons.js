import axios from 'axios';

const url = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios
          .get(url)
          .then(response => response.data);
}

const create = newPerson => {
  return axios
          .post(url, newPerson)
          .then(response => response.data);
}

const deletePerson = id => {
  return axios
          .delete(`${url}/${id}`)
          .then(response => response.data);
}

const updatePerson = (id, newPerson) => {
  return axios
          .put(`${url}/${id}`, newPerson)
          .then(response => response.data);
}

const personService = {
  getAll,
  create,
  deletePerson,
  updatePerson
}

export default personService;