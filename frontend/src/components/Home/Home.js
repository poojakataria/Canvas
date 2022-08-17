import React, { Component } from 'react';
import '../../App.css';
import { MainCourse } from '../Course/MainCourse';
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseExist: 'true'
        }
    }



    componentDidMount() {
        console.log("did mount");
        let sjsuid = this.props.sjsuId;
        let role = this.props.role;
        console.log("props in Home", sjsuid, role);
    }

    render() {
        return (
            <div>
                <MainCourse role={this.props.role} sjsuId={this.props.sjsuId} />
                {this.props.role == 'faculty' ?
                    <Link to="/CreateCourse" className="btn btn-primary">Create New Course</Link> :
                    <Link to="/SearchCourse" className="btn btn-primary">Search Course</Link>}

            </div>
        )
    }
}
export default Home;