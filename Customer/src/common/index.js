var baseUrl = 'http://localhost:8081/CourseDesign_war_exploded';
export function post (url, data) {
  var urlPath = baseUrl + url
  console.log(urlPath);
  return new Promise((resolve) => {
    this.axios.post(urlPath, data,{headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        resolve(res.data)
      }).catch(error => {
     console.log(error);
      // reject(error.response.status + error.response.statusText)
    })
  })
}

export function get(url) {
  var urlPath = baseUrl + url
  console.log(urlPath);
  return new Promise((resolve) => {
    this.axios.get(urlPath)
      .then(res => {
        resolve(res.data)
      }).catch(error => {
     console.log(error);
      // reject(error.response.status + error.response.statusText)
    })
  })
}
