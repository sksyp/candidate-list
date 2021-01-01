import axios from "axios";

const http = axios.create({
    baseURL: "https://s3-ap-southeast-1.amazonaws.com/he-public-data",
    headers: {
        "Content-type": "application/json"
      }
});

export default http