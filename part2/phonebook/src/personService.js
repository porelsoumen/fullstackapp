import axios from 'axios'

const baseUrl = '/api'
const getAll = () => {
    const request = axios.get(`${baseUrl}/persons`)
    return request.then(response => response.data)
}

const get = (id) => {
    const request = axios.get(`${baseUrl}/person/${id}`)
    return request.then(response => response.data)
}
const create = (newPerson) => {
    const request = axios.post(`${baseUrl}`, newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/person/${id}`)
    return request.then(response => console.log(response))
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/person/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update } //Assign object to a variable before exporting as module default  import/no-anonymous-default-export