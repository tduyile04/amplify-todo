import React, { Component, Fragment } from 'react';
import Auth from '@aws-amplify/auth';
import config from './aws-exports';

import { navigate } from '@reach/router';

Auth.configure(config);

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    code: '',
    phase: 0
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignUp = async () => {
    const { username, password, email, phone_number } = this.state;
    try {
      const user = await Auth.signUp({ username, password, attributes: { email, phone_number }})
      this.setState(() => ({ phase: 1 }))
    } catch(error) {
      console.log(`the error ${error.code} === ${error.message}`);
    }
  }

  handleConfirmSignUp = async () => {
    const { username, code } = this.state;
    try {
      await Auth.confirmSignUp({ username, code });
      navigate('/todo');
    } catch(error) {
      console.log(`the error ${error.code} === ${error.message}`)
    }
  }

  render() {
    const { phase } = this.state;
    return (
      <Fragment>
        <h1>Sign Up Here!</h1>
        {phase === 0 && (
            <div>
              <input placeholder="username" name="username" type="text" onChange={this.handleChange}/>
              <input placeholder="password" name="password" type="password" onChange={this.handleChange}/>
              <input placeholder="email" name="email" type="text" onChange={this.handleChange} />
              <input placeholder="phone number" name="phone_number" type="text" onChange={this.handleChange} />
              <button onClick={this.handleSignUp}>Sign Up</button>
            </div>
          )}
        {phase === 1 && (
            <div>
              <input placeholder="username" type="text" onChange={this.handleChange} />
              <input placeholder="code" type="text" onChange={this.handleChange} />
              <button onClick={this.handleConfirmSignUp}>Confirm Sign up</button>
            </div>
          )}
      </Fragment>
    );
  }
}

export default SignUp;
