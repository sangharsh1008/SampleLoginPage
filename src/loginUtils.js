const ADMIN_USER_CREDIANCIAL={
  email: 'admin@gmail.com',
  password: 'admin'
}

const getAllProduct=async(user,callback)=>{
 await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              console.log('skdjbfsf');
              Object.assign(json,{isProduct:true})
              callback(json)})
}

export const validateAndGetUser = async (credential, callback) => {
const {email,password}= ADMIN_USER_CREDIANCIAL

console.log(credential,ADMIN_USER_CREDIANCIAL);
if(credential.email===email&&credential.password===password){
 await  fetch('https://fakestoreapi.com/users')
  .then(res=>res.json())
  .then(jsonData=>{
 Object.assign(jsonData,{isAdminUser:true})
    callback(jsonData)})
    console.log('admin');
}else{
  console.log('normal user');
  await fetch('https://fakestoreapi.com/users')
  .then(res=>res.json())
  .then( (json)=>{
    let isValidUser=false;
    let user;
    json.forEach(element => {
      console.log(element.email,credential.email,credential.password,element.password);
     if(element.email===credential.email&&credential.password===element.password){
      isValidUser=true
      user=element;
     }
    });
    console.log('isValidUser : ',isValidUser);
    if(isValidUser){
      getAllProduct(user,callback)
    }
  })
}
};
