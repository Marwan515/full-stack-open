import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = contact => {
    const request = axios.post(baseUrl, contact)
    return request.then(res => res.data)
}

const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const updateContact = (id, contact) => {
    const request = axios.put(`${baseUrl}/${id}`, contact)
    return request.then(res => res.data)
}

export default {getAll, create, deleteContact, updateContact}