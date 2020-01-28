import React from "react";
import axios from "axios";
import Select from 'react-select';
import currentUser from '../components/common/userId'

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
  Alert,
  Col
} from "reactstrap";


class AddUser extends React.Component {
  
  constructor(){
    super();

    this.state={
      oldPassword:'',
      newPassword:'',
      newPassword2nd:'',
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
    console.log(this.state)
    const newPasswordInfo={
      oldPassword:this.state.oldPassword,
      newPassword:this.state.newPassword,
      newPassword2nd:this.state.newPassword2nd,
    }
    var id=currentUser()
    console.log(id)
    axios.post('/api/users/changePassword/'+id, newPasswordInfo)
    .then(data=>{
      console.log(data)
    })
    .catch(err=>{
      this.setState({
        errors:err.response.data
      })
      console.log(this.state)
    })
  }
  render() {
    console.log(this.state.role);
    const options=[{
        label: "admin",
        value: 'admin'
    }]
    return (
        <div className="content ">
          <Row>
            <Col  lg={{ size: 6, order: 2, offset: 0 }} md="6">
              <Card>
                <CardHeader>
                  <h3 className="title text-center">Change Password  </h3>
                </CardHeader>
                <CardBody>
                  
              {this.state.errors.massage?
              
              <Alert color="danger">
                {this.state.errors.massage}
                
              </Alert>
              :''} 
              {this.state.errors.done?
              
              <Alert color="success">
                {this.state.errors.done}
                
              </Alert>
              :''}
                  <Form onSubmit={this.onSubmit} >
                    <Row>
                      <Col className="px-md-1" lg={{ size: 8, order: 2, offset: 2 }} md={{ size: 8, order: 2, offset: 2 }} >
                        <FormGroup>
                          <label> Enter your old password </label>
                          <Input
                            placeholder="Old password"
                            type="password"
                            className={this.state.errors.oldPassword?"is-invalid":''}
                            name='oldPassword'
                            value={this.state.oldPassword}
                            onChange={this.onChange}
                          />
                          
                          {this.state.errors.oldPassword?
                          <span className="text-danger"> {this.state.errors.oldPassword} </span>
                          :''}

                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" lg={{ size: 8, order: 2, offset: 2 }} md={{ size: 8, order: 2, offset: 2 }} >
                        <FormGroup>
                          <label> Enter your New  password </label>
                          <Input
                            placeholder="New  password"
                            type="password"
                            name='newPassword'
                            className={this.state.errors.newPassword?"is-invalid":''}
                            value={this.state.newPassword}
                            onChange={this.onChange}
                          />
                          
                          {this.state.errors.newPassword?
                          <span className="text-danger"> {this.state.errors.newPassword} </span>
                          :''}

                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" lg={{ size: 8, order: 2, offset: 2 }} md={{ size: 8, order: 2, offset: 2 }} >
                        <FormGroup>
                          <label> Enter your new password agayn </label>
                          <Input
                            placeholder="Confirm password"
                            className={this.state.errors.newPassword2nd?"is-invalid":''}
                            type="password"
                            name='newPassword2nd'
                            value={this.state.newPassword2nd}
                            onChange={this.onChange}
                          />
                          
                          {this.state.errors.newPassword2nd?
                          <span className="text-danger"> {this.state.errors.newPassword2nd} </span>
                          :''}

                        </FormGroup>
                      </Col>
                    </Row>
                    <CardFooter className="text-center">
                      <Button className="btn-fill" color="primary" type="submit">
                        CONFIRM
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
