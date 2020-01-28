import React ,{Component } from 'react'
import axios from 'axios';
import Header from '../components/Navbars/Header'
import Calander from 'react-calendar'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Home extends Component{
    constructor(){
        super();
        this.state={
          meeting:[]
        }
    }
    componentDidMount(){
        axios.get('/api/meeting/allMeeting')
        .then(meeting=>{
            this.setState({
                meeting:meeting.data
            })
        })
        .catch(err=>console.log(err));
        console.log(this.state)
    }

    render(){


    return (
      <>
        <div className="content">
          <Row  className="d-flex">
            <Col  lg={{ size: 5, order: 2, offset: 3 }} md="5">
              <Card className="">
                <CardHeader>
                  <h3 className="title d-inline">Today's Meeting </h3>
                </CardHeader>
                <CardBody>
                  <div className="">
                    <Table>
                      <tbody>
                        {this.state.meeting.map(meeting=>{
                          return(
                            <tr>
                              <td>
                                <h4 className="title">{meeting.startTime} - {meeting.endTime} {meeting.title}</h4>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col  lg={{ size: 5, order: 2, offset: 3 }} md="5">
              <Card className="">
                <CardHeader>
                  <h3 className="title d-inline">Today !</h3>
                </CardHeader>
                <CardBody className="text-center">
                  <Calander/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
    }
}

export default Home;