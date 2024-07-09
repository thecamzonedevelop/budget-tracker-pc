import axios from 'axios';

export default (url, method, params) => {
  let headers = {};
  if (method === "post") {
    headers["content-type"] = "application/json";
  }
  let apiURL = 'http://localhost:5001/api' + url;
  return new Promise((resolve, reject) => {
    axios({
      url: apiURL,
      method: method,
      headers: headers,
      data: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error('Request error:', err.response ? err.response.data : err.message);
        reject(err);
      });
  });
};
