var env = 'dev';

if(env === 'local'){
  var baseURL = 'http://localhost:5000/api/';
}else if(env === 'dev'){
  var baseURL= "http://node.fountaintechies.com:5000/api/";
}
