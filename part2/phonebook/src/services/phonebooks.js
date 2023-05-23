import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = contact => {
    const request = axios.post(baseUrl, contact)
    return request.then(res => res)
}

const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const updateContact = (id, contact) => {
    const request = axios.put(`${baseUrl}/${id}`, {name: contact.name, phoneNumber: contact.number})
    return request.then(res => res)
}

const bookInfo = () => {
    const request = axios.get(`${baseUrl}/info`)
    return request.then(res => res.data)
}

export default {getAll, create, deleteContact, updateContact, bookInfo}
