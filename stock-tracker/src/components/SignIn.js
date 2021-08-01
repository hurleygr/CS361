import React, { Component } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
const axios = require('axios');

class SignIn extends Component {
    
  constructor(props) {

    super(props);
    
    this.state = {
      showModal: false,
      smShow: false,
      email: "",
      password: "",
      mode: this.props.showLog == 1 ? "login" : "register"
    };
  
    this.setUser = this.setUser.bind(this)

  }

  setMode = mode => {
    this.setState({
      mode
    });
  };

  setUser(user) {
      this.props.fun(user)
  };
  
  register() {

    axios.post('http://localhost:5000/adduser', {
        email : this.state.email,
        password : this.state.password
    })
    .then(response => {
        console.log(response)
        if (response.data == "Success, user added!") {
            this.props.onClose()
            this.setUser(this.state.email)

        } else {
            alert(response.data)
        }

    })
  }

  signIn() {
      console.log("Email: ", this.state.email, "Password ", this.state.password);
      let user = this.state.email;
      let pword = this.state.password;
    axios.post('http://localhost:5000/authenticate', {
        email : user,
        password : pword
    })
    .then(response =>  {
        console.log("response is ", response)
        if (response.data == "Authenticated") {
            console.log("new user is", user)
            this.setUser(user)
            this.props.onClose()

        };
    })
  }
  

  renderRegister = () => {
    return (
      <div>
        <div>
          <form className="form-horizontal form-loanable">
            
            <fieldset>
              <div className="form-group has-feedback required">
                <label style={{fontSize:"22px"}} htmlFor="login-email" className="col-sm-5">Username or Email</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <input
                    style={{fontSize:"16px"}}
                    type="text"
                    name="email"
                    id="login-email"
                    className="form-control"
                    placeholder="Enter username or email"
                    onChange={event => this.setState({email: event.target.value})}
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label style={{fontSize:"22px"}} htmlFor="login-password" className="col-sm-5">Password</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <div className="login-password-wrapper">
                    <input
                      style={{fontSize:"16px"}}
                      type="password"
                      name="password"
                      id="login-password"
                      className="form-control"
                      placeholder="*****"
                      required
                      onChange={event => this.setState({password: event.target.value})}
                    />
                    
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-action" style={{paddingTop:10}}>
              <button
                type="button"
                onClick={() => this.register()}
                className="btn btn-primary btn-left">Enter <span className="icon-arrow-right2 outlined"></span></button>
              
            </div>
          </form>
        
        </div>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            this.setMode("login");
          }}
        >
          Log in here
        </a>
      </div>
    );
  };

  renderLogin = () => {
    return (
      <div>
          <form className="form-horizontal form-loanable">
            
            <fieldset>
              <div className="form-group has-feedback required">
                <label style={{fontSize:"22px"}} htmlFor="login-email" className="col-sm-5">Username or Email</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <input
                    style={{fontSize:"16px"}}
                    type="text"
                    name="email"
                    id="login-email"
                    className="form-control"
                    placeholder="Enter username or email"
                    onChange={event => this.setState({email: event.target.value})}
                    //value={this.state.email}
                    required
                  />
                </div>
              </div>
              <div className="form-group has-feedback required">
                <label style={{fontSize:"22px"}} htmlFor="login-password" className="col-sm-5">Password</label>
                <div className="col-sm-7">
                  <span className="form-control-feedback" aria-hidden="true"></span>
                  <div className="login-password-wrapper">
                    <input
                      style={{fontSize:"16px"}}
                      type="password"
                      name="password"
                      id="login-password"
                      className="form-control"
                      placeholder="*****"
                      required
                      onChange={event => this.setState({password: event.target.value})}
                      //value={this.state.password}
                    />
                   
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-action" style={{paddingTop:10}}>
              <button
                type="button"
                onClick={() => this.signIn()}
                className="btn btn-primary btn-left">Enter <span className="icon-arrow-right2 outlined"></span></button>
            </div>
          </form>
       <a
          href="#"
          onClick={e => {
            e.preventDefault();
            this.setMode("register");
          }}
        >
        Create your account
        </a>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.onClose}
          onSubmit={this.onSubmit}
          bsSize="large"
        >
          <Modal.Header >
            <h2>{ this.state.mode === "login" ? "Login" :  "Register" }</h2>
          </Modal.Header>
          <Modal.Body>
            {this.state.mode === "login" ? (this.renderLogin()) : (this.renderRegister())}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SignIn;
