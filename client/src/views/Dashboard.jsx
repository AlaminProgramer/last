
import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import Select from 'react-select';
import axios from 'axios';
import './custom.css'

// reactstrap components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";


// my
import Upcomming from './Upcomming'
import Calender from 'react-calendar'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      user:'',
      startTime:'',
      endTime:'',
      date: new Date(),
      modal: false,
      meeting:[],
      message:'',
      create:false
    };
    this.valueChange=this.valueChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.updatePage=this.updatePage.bind(this);
  }

  valueChange = date => this.setState({ date:date, modal:!this.state.modal})

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  handleChange(user){
    this.setState({user})
  }
  onBlur(e){
    alert()
    this.valueChange()
    
  }
  updatePage=()=>{
    window.location.href="/admin/meeting"
  }
  onSubmit(e){
    e.preventDefault();

    const newMeeting={
      title:this.state.title,
      user:this.state.user.value,
      startTime:this.state.startTime,
      endTime:this.state.endTime,
      date:this.state.date
    }
    axios.post('/api/meeting/newMeeting', newMeeting)
    .then(res=>{ this.setState({message:"Meeting Created Successfully"})
      this.setState();
    })
    .catch(err=>{
      console.log(err)
    })
  }
  componentDidMount(){
    axios.get('/api/meeting/allMeeting')
    .then(meeting=>{
        this.setState({
            meeting:meeting.data
        })
    })
    .catch(err=>console.log(err));
  }

  render() {
    const options=[
      {
      label: "Mentee User",
      value: 'Mentee User'
      }
    ]
    console.log(this.state.message)
    return (
      <>

        <div className="content">
        <Row>
            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h3 className="title d-inline">Upcoming Meeting</h3>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                       <tbody>
                         <Upcomming meeting={this.state.meeting}/>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
            <Card className="calander-card">
                <CardHeader>
                  <h4 className="title d-inline">Create A Meeting</h4>
                </CardHeader>
                <CardBody>
                  <Calender
                    eventClick={this.handleEventClick}
                    onChange={this.valueChange}
                  />
                  <Modal
                  isOpen={this.state.modal}
                  className={this.props.className}
                  style={{width:'430px', marginTop:'80px'}}
                >
                  <ModalHeader>
                    Schedule a meeting
                  </ModalHeader>
                  <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="exampleEmail">Title</Label>
                      <Input
                        type="text"
                        name="title"
                        style={{color:'black'}}
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                    <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Select
                      style={{width:'450px'}}
                      options={ options }
                      value={this.state.user}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Start</Label>
                    <Input
                      type="text"
                      style={{color:'black'}}
                      name="startTime"
                      placeholder="Start"
                      value={this.state.startTime}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">End</Label>
                    <Input
                      type="text"
                      style={{color:'black'}}
                      name="endTime"
                      placeholder="End"
                      value={this.state.endTime}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <ModalFooter>
                    <Button color="primary" type="submit" onClick={this.updatePage}>Create Meeting</Button>{" "}
                    <Button color="secondary" onBlur={this.onBlur} onClick={this.valueChange}>
                      Cancel
                    </Button>
                  </ModalFooter>
                  </Form>
                  </ModalBody>
                </Modal>
                </CardBody>
              </Card>
            </Col>
            </Row>
        </div>

      </>
    );
  }
}

export default Dashboard;
