
import React from "react";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col
} from "reactstrap";

class UserDetails extends React.Component {
    constructor(){
        super();
        this.state={
            user:{}
        }
    }
    componentDidMount(){
       axios.get('/api/users/singleUser/'+this.props.match.params.id)
       .then(user=>{
           console.log(user)
           this.setState({
               user:user.data
           })
       })
    }
  render() {
    const user=this.state.user;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8" lg={{ size: 6, order: 2, offset: 3 }} >
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("../assets/img/anime3.png")}
                      />
                      <h5 className="title"> {user.username} </h5>
                    </a>
                    <p className="description"> {user.role} </p>
                    <p className="description"> {user.email} </p>
                    <p className="description">Member Scince : {user.date} </p>
                    <p className="description">Social Link : {user.link} </p>
                  </div>
                  <div className="card-description">
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserDetails;
