import React ,{Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'



import {
    Button
  } from "reactstrap";


export default class Upcomming extends Component{


  delete(id) {
    
    axios.get('/api/meeting/delete/'+id)
      .then(res=>{
        console.log(";ljaslfdkjlk")
      })
      .catch(err => console.log(err))
      
      window.location.href="/admin/meeting"
  }

    render(){
        return(
          <>
          {this.props.meeting.map(meeting=>{
            return(
              <tr>
                <td>
                  <p className="title">{meeting.startTime} - {meeting.endTime} {meeting.title} </p>
                </td>
                <td className="td-actions text-right">
                  <span className="text-light" outline title="Delete This meeting" color="danger" size="sm" onClick={this.delete.bind(this, meeting._id)}> <i className="tim-icons icon-trash-simple"></i> </span>
                </td>
              </tr>
            )
          })}
          </>
        )
    }
}

