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

class Tables extends React.Component {
  constructor(){
    super();
    this.state={
        user:[],
        admin:null
    }
  }
  componentDidMount(){
      axios.get('/api/users/all')
      .then(user=>{
          this.setState({
              user:user.data
          })
          
      })
      .catch(err=>console.log(err));
  }
  delete(id) {
    axios.get('/api/users/delete/'+id)
      .then(res=>{
        console.log(res)
      })
      .catch(err => console.log(err))
      
      window.location.href="/admin/users"
  }

  componentWillMount(email){
    
    
    if(email=="admin@admin.com"){
      this.setState({
        admin:true
      })
    }
    else{
      this.setState({
        admin:false
      })
    }
    console.log("hello")
  }
  approved(id){
    axios.post('/api/users/update/'+id)
    .then((data)=>{ this.componentDidMount() })
    .catch(err=>{
      console.log(err)
    })
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
                    <Col md="6"><CardTitle tag="h4">All User</CardTitle></Col>
                    <Col md="6"><CardTitle tag="h4"><Link to="/admin/addUser" style={{float:'right'}}></Link></CardTitle></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Profile</th>
                        <th>Delete</th>
                        <th>Approved</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.user.map(user=>{
                      return(
                        <tr>
                          {this.valueChanger}
                          <td className="text-capitalize"> {user.username}</td>
                          <td>{user.email}</td>
                          <td className="text-capitalize">{user.role}</td>
                          <td><Button outline color="primary" className="btn btn-sm btn-info" size="sm"><Link to={"/admin/user/"+user._id}><span className="text-light"> View Profile</span></Link></Button></td>
                          <td><Button outline color="danger" className="btn btn-sm btn-danger" size="sm" onClick={this.delete.bind(this, user._id)}> Delete </Button></td>

                          {user.isApproved===true?(
                            <td><button title="This user added " color="primary " className="btn btn-success btn-sm" size="sm">Approved</button></td>
                          ):(
                            <td><button title="Add this user" className="btn btn-warning btn-sm" onClick={this.approved.bind(this, user._id)}>Pending</button></td>
                          )}
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

export default Tables;
