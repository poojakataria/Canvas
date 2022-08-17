import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Login } from './Login/Login';
import { SignUp } from './SignUp/SignUp';
import { Student } from './Student/Student';
import { Faculty } from './Faculty/Faculty';
import Home from './Home/Home';



//Main 
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sjsuId: "",
            role: ""
        }
    }

    sjsuIdCallback = (sjsuId, role) => {
        this.setState({ sjsuId: sjsuId, role: role })
    }
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                {/*<Route path="/" component={Navbar}/>*/}
                <Route path="/Login" render={(props) => <Login {...props} setSjsuId={this.sjsuIdCallback} />} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/Student" render={(props) => <Student {...props} sjsuId={this.state.sjsuId} role={this.state.role} />} />
                <Route path="/Faculty" render={(props) => <Faculty {...props} sjsuId={this.state.sjsuId} role={this.state.role} />} />
                <Route path="/Home" render={(props) => <Home {...props} sjsuId={this.state.sjsuId} />} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;