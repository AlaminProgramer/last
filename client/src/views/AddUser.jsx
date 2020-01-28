import React from "react";
import axios from "axios";
import Select from 'react-select';


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
  Col
} from "reactstrap";

class AddUser extends React.Component {
  constructor(){
    super();

    this.state={
      username:'',
      email:'',
      role:'',
      password:'',
      message:'',
      isAproved:false,
      errors:{}
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  handleChange(role){
    this.setState({role})
  }

  onSubmit(e){
    e.preventDefault();

    const newUser={
      username:this.state.username,
      email:this.state.email,
      role:this.state.role.value,
      password:this.state.password,
      password2:this.state.password2,
      isAproved:this.state.isAproved
    }
    axios.post('/api/users/register', newUser)
    .then((data)=>{ this.props.history.push("/admin/users")})
    .catch(err=>{
      this.setState({
        errors:err.response.data
      })
      console.log(this.state.errors)
    })
  }
  render() {
    console.log(this.state.role);
    const options=[{
        label: "admin",
        value: 'admin'
    }]
    return (
        <div className="content">
          <Row>
            <Col  lg={{ size: 6, order: 2, offset: 0 }} md="6">
              <Card>
                <CardHeader>
                  <h3 className="title text-capitalize">Create a new admin account </h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit} >
                    <Row>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label> Full Name </label>
                          <Input
                            placeholder="Username"
                            type="text"
                            className={this.state.errors.name?"is-invalid":''}
                            name='username'
                            value={this.state.username}
                            onChange={this.onChange}
                          />
                          
                          {this.state.errors.name?
                          <span className="text-danger"> {this.state.errors.name} </span>
                          :''}
                          
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
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
                    </Row>
                    <Row>
                       <Col className="pr-md-1" md="6">
                       <FormGroup>
                            <label for="exampleSelect">Role</label>
                            <Select
                            className={this.state.errors.role?"is-invalid":''}
                            options={ options }
                            value={this.state.role}
                            onChange={this.handleChange}
                            />
                            
                          {this.state.errors.role?
                          <span className="text-danger"> {this.state.errors.role} </span>
                          :''}
                            
                        </FormGroup>
                       </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            className={this.state.errors.password?"is-invalid":''}
                            type="password"
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                          
                          {this.state.errors.password?
                          <span className="text-danger"> {this.state.errors.password} </span>
                          :''}
                          
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input
                            placeholder="Confirm Password"
                            type="password"
                            className={this.state.errors.password2?"is-invalid":''}
                            name='password2'
                            value={this.state.password2}
                            onChange={this.onChange}
                          />
                          
                          {this.state.errors.password2?
                          <span className="text-danger"> {this.state.errors.password2} </span>
                          :''}
                        </FormGroup>
                      </Col>
                    </Row>
                    <CardFooter>
                      <Button className="btn-fill" color="primary" type="submit">
                        Submit
                      </Button>
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

export default AddUser;
