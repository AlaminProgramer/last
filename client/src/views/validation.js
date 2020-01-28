import { object } from "prop-types"

function validation(obj){
    var result=null
var err={}
    if(!obj.title){
        err.title="Please give a title"
        result=false
    }
    if(!obj.user){
        err.user="Please select the user"
        result=false

    }
    if(!obj.startTime){
        err.startTime="Please give a start time"
        result=false
    }
    if(!obj.endTime){
        err.endTime="Please give a end time"
        result=false
    }
    return{
        result,
        err
    }
    
}
export default validation