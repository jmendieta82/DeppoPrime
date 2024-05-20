import axios from "axios";

export const deppoApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/',
  headers:{
    'Authorization': `Token abf23a5368684252213bb636e2d43c13d14bb071`,
    'Content-Type': 'application/json',
  },
})

export const get = async (endpoint:string) => {
  try {
    const response = await deppoApi.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(`Se produjo un error al obtener los datos. ${error}`);
  }
};

export const post = async (endpoint:string,data:any) => {
  try {
    const response = await deppoApi.post(endpoint,data);
    return response.data;
  } catch (error) {
    throw new Error(`Se produjo un error al insertar los datos. ${error}`);
  }
}