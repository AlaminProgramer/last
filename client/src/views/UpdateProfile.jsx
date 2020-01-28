import React from "react";
import axios from "axios";
import queryString from "query-string";
import  './style.css'
import { Link} from 'react-router-dom'
import jwtDecoder from 'jwt-decode'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  FormFeedback
} from "reactstrap";
 class UpdateProfile extends React.Component {
  constructor(){
    super();
         this.state={
      username:'',
      email:'',
      password:'',
      message:'',
      role:"",
      isApproved:true,
      errors:{},
      noUser:'',
      link:'',
      imageName:'Choose Profile image',
      date:'',
      file:''
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.onFileChoose=this.onFileChoose.bind(this)
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit(e){
    e.preventDefault();
     if(localStorage.getItem('token')){
      let id=jwtDecoder(localStorage.getItem('token')).id

      const formData=new FormData()
      console.log(formData)
      formData.append('file' , this.state.file)
      formData.append('username',this.state.username )
      formData.append('email',this.state.email )
      formData.append ('link', this.state.link)
      axios.post('/api/users/updateInfo/'+id, formData )
      .then((data)=>{
        console.log(data.data)
        //  this.props.history.push("/login")
        console.log(data)
      })
      .catch(err=>{
        this.setState({
          errors:err.response.data
        })
        console.log(err.response.data)
      })
     }
  }
  
  onFileChoose(event){
    console.log(event.target.files[0])
    this.setState({
      imageName: event.target.files[0].name,
      file : event.target.files[0]
    })
    console.log(this.state)
  }
  render() {
    console.log(this.state.role);
    const errors=this.state.errors
    return (
        <div className="content">
          <Row>
            <Col  lg={{ size: 6, order: 2, offset: 0 }} md="6">
              <Card>
                <CardHeader>
                  <h3 className="title text-center">Update your Profile </h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit} >
                  <Row>
                      <Col className="px-md-1" md="6">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="customFile" onChange={this.onFileChoose} />
                          <label class="custom-file-label" for="customFile"> {this.state.imageName} </label>
                          
                          {this.state.errors.image ?
                          <span className="text-danger"> {this.state.errors.image} </span>
                          :''
                          }
                        </div>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <Input
                          className={this.state.errors.link? "is-invalid ":''}
                            placeholder="Social link"
                            type="text"
                            name='link'
                            value={this.state.link}
                            onChange={this.onChange}
                          />
                          {this.state.errors.link ?
                          <span className="text-danger"> {this.state.errors.link} </span>
                          :''
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label> Full Name </label>
                          <Input
                          className={this.state.errors.name? "is-invalid ":''}
                            placeholder="Username"
                            type="text"
                            name='username'
                            value={this.state.username}
                            onChange={this.onChange}
                          />
                          {this.state.errors.name ?
                          <span className="text-danger"> {this.state.errors.name} </span>
                          :''
                          }
                        </FormGroup>                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="email">
                            Email address
                          </label>
                          <Input
                            id="email"
                            className={this.state.errors.email? "is-invalid ":''}
                            placeholder="Email "
                            type="email"
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                          />                          {this.state.errors.email ?
                          <span className="text-danger"> {this.state.errors.email} </span>
                          :''
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                    <CardFooter>
                      <Button  className="btn-fill" color="primary" type="submit">Update Profile</Button>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="3"></Col>
          </Row>
        </div>
    );
  }
}

export default UpdateProfile