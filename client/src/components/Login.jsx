import React from "react";
import axios from 'axios';
import queryString from "query-string";
import {Link} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

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
  Col
} from "reactstrap";

class Login extends React.Component {
  constructor(){
    super();

    this.state={
      email:'',
      password:'',
      errors:{}
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  redirect=()=>{
    //this.props.history.push("/")
    console.log('selim reza')
  }
  onSubmit(e){
    e.preventDefault();

    const newUser={
      email:this.state.email,
      password:this.state.password,
    }
    axios.post('/api/users/login', newUser)
    .then((data)=>{
      localStorage.setItem('token', data.data.token);
      const token =data.data.token
      const decoded =jwtDecode(token)
      // alert(decoded)
      console.log(decoded)
      if(decoded.role=="admin" || decoded.role=="mentor"){
        window.location.href="/admin/meeting"
      }else {window.location.href="/"}
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
    const token=localStorage.getItem('token')
    if(token){
      window.location.href='/'
    }
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <h3 className="title text-center">Login Form </h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col  lg={{ size: 6, order: 2, offset: 3 }} className="px-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="email">
                            Email address
                          </label>
                          <Input
                            id="email"
                            className={this.state.errors.email?"is-invalid":''}
                            placeholder="Email "
                            type="email"
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                          {this.state.errors.email?
                          <span className="text-danger"> {this.state.errors.email} </span>
                          :''}
                        </FormGroup>
                      </Col>
                      <Col   lg={{ size: 6, order: 2, offset: 3 }} className="px-md-1" md="6">
                        <FormGroup>

                        <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            className={this.state.errors.password?"is-invalid":''}
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                          {this.state.errors.password?
                          <span className="text-danger"> {this.state.errors.password} </span>
                          :''}
                        </FormGroup>
                        {this.state.errors.approved?
                          <span className="text-danger"> {this.state.errors.approved} </span>
                          :''}

                      </Col>
                    </Row>

                    <Col className=""  lg={{ size: 3, order: 0, offset: 3 }} >
                      <CardFooter   >
                        <Button  className="btn-fill" color="primary" type="submit">
                          Sign In
                        </Button>
                      </CardFooter>
                    </Col>
                  </Form>
                </CardBody>

                <div className="title text-center pt-2 pb-2">
                  <h2>Or , Login with </h2>
                    <a href="http://localhost:5000/auth/facebook" className="authButton">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                    </a>
                    <a href="http://localhost:5000/auth/google" className="authButton pb-2">
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
                    <span className="pt-2 pb-2">Not registerd yet? go to <Link to="/register">Regisger</Link></span>
                  </div>
              </Card>
            </Col>
            <Col md="3"></Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Login;
