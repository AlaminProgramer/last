
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
import Axios from "axios";

class UserProfile extends React.Component {
  state={
    image:''
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      let id=jwtDecode(localStorage.getItem('token')).id
      Axios.get('/api/users/singleUser/'+id)
      .then(data=>{
        this.setState({
          image:data.data.image
        })
      })
      .catch(err=>{
        console.log('erorr occurd', err)
      })
    }
    // console.log(this.state)
  }
  render() {
    var userData
    const token=localStorage.getItem('token')
    if(token){
       userData=jwtDecode(token)
       console.log(userData)
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
                        src={'/'+this.state.image}
                      />
                      <h5 className="title"> {userData.name} </h5>
                    </a>
                    <p className="description"> {userData.role} </p>
                    <p className="description"> {userData.email} </p>
                    <p className="description"> Member Scince: {userData.date} </p>
                    <p className="description"> Social Link: {userData.link} </p>
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
