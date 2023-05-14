import axios from "axios";

const getAll = () => {
  const request = axios.get('https://restcountries.com/v3.1/all')
  return request.then(res => res.data)
}

export default {getAll}