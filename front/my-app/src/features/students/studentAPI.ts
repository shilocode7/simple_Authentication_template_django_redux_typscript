import ICred from "../../models/Cred";
import axios from 'axios';
const MY_SERVER = "http://127.0.0.1:8000/"

export function login(cred:ICred) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MY_SERVER +"login/" , cred).then(res => resolve({data:res.data}))
  );
}

export async function getStudent() {
  return await axios.get(MY_SERVER + "student/").then(res => res.data);
}
