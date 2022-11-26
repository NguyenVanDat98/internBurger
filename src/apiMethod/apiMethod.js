import axios from "axios";
 
export const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/internburger-6dd37/us-central1/app',
    headers: {'Content-Type': 'application/json'}
  });

  export const getDataAll = async(param)=>{
    const data = await axiosClient.get(param)
    return data.data
}
  export const getUserEmail = async(param)=>{
    const data = await axiosClient.get(`users/${param}`)
    return data.data
}

  export const AddUser = async(param,data)=>{
    const res = await axiosClient.post(param,data)
    return res
}
  export const addOrder = async(param,data)=>{
    const res = await axiosClient.post(param,data)
    return res
}