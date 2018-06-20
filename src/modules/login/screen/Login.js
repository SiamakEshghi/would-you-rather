import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { handleInitialData } from '../../../Public/actions';

// const BUTTONS = ['Default'];

class Login extends Component {
    changeValue = (val) => {
        const { loginUser, handleInitialData, history } = this.props;
        const value = val.target.value;
        loginUser(value);
        handleInitialData(value);
        history.push('/dashboard')
    }
    render() {
        return(
            <div>
                <h1>Login</h1>
                <h1>---------------------------</h1>
                <h2>Select user</h2>
                <select onChange={this.changeValue}>
                    <option value=''>Select</option>
                    <option value="sarahedo">Sarah Edo</option>
                    <option value="tylermcginnis">Tyler McGinnis</option>
                    <option value="johndoe">John Doe</option>
                </select>
            </div>
            
        );
    }
}

export default connect(null, { loginUser, handleInitialData })(Login);