import axios from 'axios';

const url = 'http://localhost:3001/persons'

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

const personService = {
  getAll,
  create
}

export default personService;