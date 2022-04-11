import axios from 'axios'
const baseUrl = '/api/notes'

let token = null;

const setToken = newtoken => {
  token = `bearer ${newtoken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }

  return axios
          .post(baseUrl, newObject, config)
          .then(response => response.data);
}

const update = (id, newObject) => {
  return axios
          .put(`${baseUrl}/${id}`, newObject)
          .then(response => response.data)
}

const noteService = { 
  getAll, 
  create, 
  update, 
  setToken
};

export default noteService;