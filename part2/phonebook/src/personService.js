import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(`${baseUrl}`, newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log(response))
}

export default { getAll, create, remove } //Assign object to a variable before exporting as module default  import/no-anonymous-default-export