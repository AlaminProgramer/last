import React from "react";
import axios from "axios";
import queryString from "query-string";
import  './style.css'
import { Link} from 'react-router-dom'


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

class Register extends React.Component {
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
      imageName:'Choose image',
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
    const formData=new FormData()
    formData.append('file' , this.state.file)
    formData.append('username',this.state.username )
    formData.append('email',this.state.email )
    formData.append('role',this.state.role )
    formData.append('password',this.state.password )
    formData.append('password2',this.state.password2 )
    formData.append('isApproved',this.state.isApproved )
    const newUser={
      username:this.state.username,
      email:this.state.email,
      role:this.state.role,
      password:this.state.password,
      password2:this.state.password2,
      isApproved:this.state.isApproved
    }
    axios.post('/api/users/register', formData )
    .then((data)=>{
      console.log(data.data)
      //  this.props.history.push("/login")
      console.log(data)
    })
    .catch(err=>{
      this.setState({
        errors:err.response.data
      })
    })
  }
  componentDidMount() {
    if(this.props.location.search){
      var query = queryString.parse(this.props.location.search);
      if (query.token) {
        localStorage.setItem("token", query.token);
        window.location.href="/"
      }
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
                  <h3 className="title text-center">Registration Form </h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit} >
                  <Row>
                      <Col className="px-md-1" md="6">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="customFile" onChange={this.onFileChoose} />
                          <label class="custom-file-label" for="customFile"> {this.state.imageName} </label>
                        </div>
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
                        </FormGroup>

                      </Col>
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
                          />

                          {this.state.errors.email ?
                          <span className="text-danger"> {this.state.errors.email} </span>
                          :''
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                          className={this.state.errors.password? "is-invalid ":''}
                          type="password"
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                          />

                          {this.state.errors.password ?
                          <span className="text-danger"> {this.state.errors.password} </span>
                          :''
                          }
                        </FormGroup>
                      </Col>

                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input
                          className={this.state.errors.password2? "is-invalid ":''}
                          placeholder="Confirm Password"
                            type="password"
                            name='password2'
                            value={this.state.password2}
                            onChange={this.onChange}
                          />

                          {this.state.errors.password2 ?
                          <span className="text-danger"> {this.state.errors.password2} </span>
                          :''
                          }
                        </FormGroup>
                      </Col>
                      <Col md="12 " className="pt-2 pb-2">
                      <h4 >Please choose your type</h4>

                      </Col>
                      <Col onChange={this.onChange} className="pl-md-1 mentee " md="6">
                        <FormGroup>
                          <Input
                            type="radio"
                            id="mentor"
                            name="role"
                            value="mentor"
                          />
                          <label className="fs" htmlFor="mentor"> <h5>Mentor</h5></label>
                          <Input
                            type="radio"
                            id="mentee"
                            name="role"
                            value="mentee"
                          />
                          <label htmlFor="mentee" className="fs"> <h5>Mentee</h5></label>
                        </FormGroup>
                      </Col>
                      {this.state.errors.role ?
                          <span className="text-danger"> {this.state.errors.role} </span>
                          :''
                      }
                    </Row>
                    <CardFooter>
                      <Button  className="btn-fill" color="primary" type="submit">
                        Sign Up
                      </Button>
                    </CardFooter>
                  </Form>
                </CardBody>
                <h6 className="text-center ">Or , Sign Up With </h6>

                <div className="title text-center">
                    <a href="http://localhost:5000/auth/facebook" className="authButton">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                    </a>
                    <a href="http://localhost:5000/auth/google" className="authButton">
                      <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                      </Button>
                    </a>
                    <a href="http://localhost:5000/auth/linkedin" className="authButton">
                      <Button className="btn-icon btn-round" color="google">
                      <i class="fab fa-linkedin"></i>
                      </Button>
                    </a>
                    <br/>
                    <span className="pt-2 pb-2">Allready  have accout ? go to <Link to="/login">Login </Link></span>

                  </div>
              </Card>
            </Col>
            <Col md="3"></Col>
          </Row>
        </div>
    );
  }
}

export default Register;
