import React, { Component } from "react";
import "../../App.css";
import { validateAndGetUser} from "../../utils/loginUtils";
import { AvForm, AvField } from "availity-reactstrap-validation";
import StylePage, { StyledButton } from "app/common/component/StylePage";
import { Header } from "app/common/component/Header";

import {UserListComponent} from './components/UserList'
import {ProductListComponent} from './components/ProductList'


import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: false,
      name: "",
      password: "",
      userList:[],
      isAdminUser:false,
      isNormalUser:false,
      productList:[]
    };
  }
  
  handleValidSubmit = (event, values) => {
    event.preventDefault();
    this.setState(
      {
        name: values.email,
        password: values.password
      },
      () => {
        validateAndGetUser({email:values.email,password:values.password},(data)=>{
          if(data.isAdminUser){
          this.setState({
            userList:data,
            isAdminUser:true
          })
        }else if(data.isProduct){
          console.log(data)
          
          this.setState({
            productList:data,
            isNormalUser:true
          })
        }
        })
      }
    );
    console.log(`Login Successful`, values);
  };

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
    console.log(`Login failed`);
  };

  convertBtoa = () => {
    const { name, password } = this.state;
    console.log(name, "name", password, "password");
    const string = `${name}:${password}`;

    const utf8Bytes = encodeURIComponent(string).replace(
      /%([0-9A-F]{2})/g,
      function(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    );
    return btoa(utf8Bytes);
  };

diaplayUserList(){
  const { userList,productList } = this.state;
console.log(userList)
  return(<div style>{userList[0].email}</div>)
}

  render() {
    const { isAdminUser,userList,isNormalUser } = this.state;

if(isAdminUser){
  return <div><UserListComponent UserList={userList} toggle={()=>{
    this.setState({
  isNormalUser: false
})}}/></div>
} else if(isNormalUser){
  return <div><ProductListComponent ProductList={this.state.productList} toggle={()=>{
    this.setState({
  isNormalUser: false
})}}/></div>

}else{
    return (
      <StylePage
        Header={<Header h1="Login Page" h2="*************" />}
        outerBoxPadding={"60px 15px"}
      >
        <div
          style={{
            justifyContent: "center",
            padding: "0 22px 0 22px",
            width: "100%",
            height: "100%"
          }}
        >
          <AvForm
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <div
              className="form-group"
              style={{
                fontSize: "12px",
                justifyContent: "center",
                display: "flex"
              }}
            >
              <div style={{ width: "20%" }}>
                <span
                  className="input-group-addon"
                  style={{
                    border: "1px solid lightgrey"
                  }}
                >
                  <i
                    className="glyphicon glyphicon-user"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div style={{ width: "80%" }}>
                <AvField
                  style={{ fontSize: "inherit", height: "30px" }}
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  validate={{
                    required: true,
                    email: true
                  }}
                />
              </div>
            </div>

            <div
              className="form-group"
              style={{
                fontSize: "12px",
                justifyContent: "center",
                display: "flex"
              }}
            >
              <div style={{ width: "20%" }}>
                <span
                  className="input-group-addon"
                  style={{ border: "1px solid lightgrey" }}
                >
                  <i
                    className="glyphicon glyphicon-lock"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div style={{ width: "80%" }}>
                <AvField
                  style={{ fontSize: "inherit", height: "30px" }}
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  type="password"
                  validate={{
                    // required: {
                    //   value: true,
                    //   errorMessage: "Please enter your password"
                    // },
                    // pattern: {
                    //   value: "^[A-Za-z0-9]+$",
                    //   errorMessage:
                    //     "Your password must be composed only with letter and numbers"
                    // },
                    // minLength: {
                    //   value: 6,
                    //   errorMessage:
                    //     "Your password must be between 6 and 16 characters"
                    // },
                    // maxLength: {
                    //   value: 50,
                    //   errorMessage:
                    //     "Your password must be between 6 and 16 characters"
                    // }
                  }}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <StyledButton name="Login" />
            </div>
          </AvForm>{" "}
        </div>
      </StylePage>
    );
  }
}
}
export default Login;
