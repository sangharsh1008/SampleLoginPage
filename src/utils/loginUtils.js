// const request = window.require("request");
export const getProjectData = async (string, callback) => {
  await new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: "https://mitrmedia.atlassian.net/rest/api/3/issue/createmeta",
      headers: {
        "cache-control": "no-cache",
        authorization: `Basic ${string}`,
        "content-type": "application/json"
      },

      json: true
    };

    // request(options, function(error, response, body) {
    //   if (error) throw new Error(error);
    //   callback && callback(body);
    //   return resolve(body);
    // });
  });
};

const ADMIN_USER_CREDIANCIAL={
  Email: 'admin@xyz.com',
Password: 'Admin_007'
}

const getAllProduct=async(user,callback)=>{
 await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              Object.assign(json,{isProduct:true})
              callback(json)})
}


export const validateAndGetUser = async (credential, callback) => {
const {Email,Password}= ADMIN_USER_CREDIANCIAL


if(credential.email===Email&&credential.password===Password){
 await  fetch('https://fakestoreapi.com/users')
  .then(res=>res.json())
  .then(jsonData=>{
 Object.assign(jsonData,{isAdminUser:true})
    callback(jsonData)})
}else{
  await fetch('https://fakestoreapi.com/users')
  .then(res=>res.json())
  .then( (json)=>{
    let isValidUser=false;
    let user;
    json.forEach(element => {
     if(element.email===credential.email&&credential.password===element.password){
      isValidUser=true
      user=element;
     }
    });  
    if(isValidUser){
      getAllProduct(user,callback)
    }

  })
}
};


