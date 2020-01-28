
import Dashboard from "./views/Dashboard.jsx";
import User from "./views/User.jsx";
import AddUser from './views/AddUser.jsx';
import Mentor from './views/Mentor';
import Mentee from './views/Mentee';
import UserDetails from "./views/UserDetails.jsx";
import changePassword from  './components/chagePassword'
import UpdateProfile from './views/UpdateProfile'

var routes={
  mentorRoutes:[
    {
      path: "/meeting",
      name: "Meeting",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-time-alarm",
      component: Dashboard,
      layout: "/admin"
    },
    {
      path: "/changePassword",
      name: "Change password",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-lock-circle",
      component: changePassword,
      layout: "/admin"
    },
    {
      path: "/mentor",
      name: "Mentor",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-satisfied",
      component: Mentor,
      layout: "/admin"
    },
    {
      path: "/mentee",
      name: "Mentee",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-satisfied",
      component: Mentee,
      layout: "/admin"
    },
    {
      path: "/updateProfile",
      name: "Update Profile",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-satisfied",
      component: UpdateProfile,
      layout: "/admin"
    },
    {
      path: "/user/:id",
      component: UserDetails,
      layout: "/admin"
    },
  ],
  adminRoutes :[
    {
      path: "/meeting",
      name: "Meeting",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-time-alarm",
      component: Dashboard,
      layout: "/admin"
    },
    {
      path: "/users",
      name: "All users",
      rtlName: "قائمة الجدول",
      icon: "tim-icons icon-world",
      component: User,
      layout: "/admin"
    },

    {
      name:"New Admin",
      path: "/addUser",
      component: AddUser,
      icon: "tim-icons icon-simple-add",
      layout: "/admin"
    },
    {
      path: "/changePassword",
      name: "Change password",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-lock-circle",
      component: changePassword,
      layout: "/admin"
    },
    ,
    {
      path: "/updateProfile",
      name: "Update Profile",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-satisfied",
      component: UpdateProfile,
      layout: "/admin"
    },
    {
      path: "/user/:id",
      component: UserDetails,
      layout: "/admin"
    }
  ]
}
export default routes;
