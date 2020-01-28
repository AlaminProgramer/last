import React from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'

// reactstrap components
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class Mentor extends React.Component {
  constructor(){
    super();
    this.state={
        user:[]
    }
  }
  componentDidMount(){
    var count=0
      axios.get('/api/users/mentor')
      .then(user=>{
          console.log(user)
          this.setState({
              user:user.data
          })
      })
      .catch(err=>console.log(err));
      setTimeout(() => {
        this.state.user.forEach(single=>{
          count=count+1
        })
        this.setState({count:count})

      }, 1200);
  }
  delete(id) {
    axios.get('/api/users/delete/'+id)
      .then(res=>{ this.componentDidMount() })
      .catch(err => console.log(err))
    
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col  md="12">
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="6"><CardTitle tag="h4">All Mentor <span   > (Total Mentee {this.state.count}</span> ) </CardTitle></Col>
                    <Col md="6"><CardTitle tag="h4"><Link to="/admin/addUser" style={{float:'right'}}></Link></CardTitle></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Profile</th>
                        <th>Role</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.user.map(user=>{
                      return(
                        <tr>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td className="text-capitalize">{user.role}</td>
                          <td><Button outline color="primary" className="btn btn-sm btn-info" size="sm"><Link to={"/admin/user/"+user._id}><span className="text-light">View Profile</span></Link></Button></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Mentor;
