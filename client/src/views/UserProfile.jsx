
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
    image:'',
    name:'',
    email:'',
    role:'',
    date:'',
    link:''


  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      let id=jwtDecode(localStorage.getItem('token')).id
      Axios.get('/api/users/singleUser/'+id)
      .then(data=>{
        this.setState({
          image:data.data.image,
          name:data.data.username,
          email:data.data.email,
          role:data.data.role,
          date:data.data.date,
          link:data.data.link,
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
                      <h5 className="title"> Name: {this.state.name} </h5>
                    </a>
                    <p className="description"> {this.state.role} </p>
                    <p className="description"> {this.state.email} </p>
                    <p className="description"> Member Scince: {this.state.date} </p>
                    <p className="description"> Social Link: {this.state.link} </p>
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
