import React, { Component } from "react";
import { validateAndGetUser} from "./loginUtils";
import { AvForm, AvField } from "availity-reactstrap-validation";
import StylePage, { StyledButton } from "./app/common/component/StylePage";
import { Header } from "./app/common/component/Header";
import {UserListComponent} from './UserList'
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'john@gmail.com',
      name: "",
      password: "m38rmF$",
      userList:[],
      isAdminUser:false,
      isNormalUser:false,
      productList:[]
    };
  }

  handleValidSubmit = (event, values) => {
    const { email = 'john@gmail.com',password='m38rmF$'} = values;
    event.preventDefault();
    this.setState(
      {
        name: email,
        password: password
      },
      () => {
        console.log('data')
        validateAndGetUser({email:email,password:password},(data)=>{
          if(data.isAdminUser){
          this.setState({
            userList:data,
            isAdminUser:true
          })
        }else if(data.isProduct){
          this.props.dispatch({ type:'userLoggedIn',payload:{isUserLogged:true}})

          this.setState({
            productList:data,
            isNormalUser:true
          })
          console.log(data);
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

  render() {
    const { isAdminUser,userList,isNormalUser } = this.state;
    // if(this.props.userLoggedIn){
    //   this.props.dispatch({ type:'userLoggedIn',payload:{isUserLogged:false}})
    // }
    console.log(this.props,this.state);

    if(isAdminUser){
      return <div><UserListComponent UserList={userList} toggle={()=>{
        this.setState({
      isNormalUser: false
    })}}/></div>
    } else if(isNormalUser){
      return <div>Hello {this.state.email.split('@')[0]}</div>
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
                  value="john@gmail.com"
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
                  value="m38rmF$"
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
function stateToProps(state) {
  console.log(state);
  return {
    userLoggedIn:state.reducer.isUserLogged
  };
}
export default connect(stateToProps)(Login);
