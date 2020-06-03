import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class RegisterPage extends Component {
  state = {
    email: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="formPanel" onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="email">
              email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor("email")}

              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>


        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </button>
        </center>

      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
