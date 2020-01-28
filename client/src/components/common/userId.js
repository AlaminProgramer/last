import decoded from 'jwt-decode';
const currenUser=()=>{
  var id 
    var userToken=localStorage.getItem('token');
    if(userToken){
      var user=decoded(userToken);
      id=user.id
      return user.id
    }else{
      return null
    }
}
export default currenUser;