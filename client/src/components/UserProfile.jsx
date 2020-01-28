
import React from "react";
import jwtDecode from 'jwt-decode'


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

class UserProfile extends React.Component {
  render() {
    var userData
    const token=localStorage.getItem('token')
    if(token){
       userData=jwtDecode(token)
    }

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
                      <h5 className="title"> {userData.name} </h5>
                    </a>
                    <p className="description"> {userData.role} </p>
                    <p className="description"> {userData.email} </p>
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

export default UserProfile;
