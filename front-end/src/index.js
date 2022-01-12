import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from "react-router-dom";


import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";


// layouts
import Settings from "./components/Cards/CardSettings"
import Admin from "./pages/layouts/Admin.js";
import Login from "./pages/auth/Login";
import AddMember from "./pages/layouts/Addmember";
import AddProject from "./pages/layouts/Addproject";
import CheckProject from "./pages/layouts/Checkmproject";
import UpdateProject from "./pages/layouts/Updateproject";
import UpdateMember from "./pages/layouts/Addmember";
import MemberProject from "./pages/layouts/MemberProject";
import DeleteProjectMember from "./pages/layouts/DeleteProjectMember";
import ProjectMember from "./pages/admin/ProjectMember";
import {AuthService} from "./utils/service/authservice";
import MemberList from "./pages/Members/Members";
import Topfive from "./pages/Topfive/TopFive";
import AdminRoute from "./pages/private/AdminRoutes"
import UserRoute from "./pages/private/UserRoutes";
import {ProjectContextProvider} from "./utils/context/ProjectContext"
import {MemberContextProvider} from "./utils/context/MemberContext"
import {CritereContextProvider} from "./utils/context/CritereContext"





// views without layouts

import Landing from "./pages/Landing/Landing";
import Profile from "./pages/Profile/Profile";
import Index from "./pages/Home/Index";
import Project from "./pages/Projets/projets";




const memberUrl = "http://localhost:8000/api/v1/member/getAll";
const projectUrl = "http://localhost:8000/api/v1/project/ProjectCritere";


const App = () => {
    const User=AuthService.getCurrentUser();
  //get member
  const [member, setMember] = useState([]);
    useEffect(() => {
        axios.get(memberUrl)
             .then((response) => {
                const users = response.data;
                setMember(users);
        });
    }, []);
    // get project
    const [ project, setProject] = useState([]);
    useEffect(() => {
      axios.get(projectUrl)
          .then((response) => {
              const projet = response.data;
              setProject(projet);
        });
    }, [])
        return (
            <CritereContextProvider>
                <ProjectContextProvider>
                    <MemberContextProvider>
                      <BrowserRouter>
                          <Switch>
                              {/* add routes with layouts */}
                              <Route exact path="/views/public/memberlist">
                                      <MemberList />
                              </Route>
                              <Route exact path="/views/public/projets">
                                      <Project />
                              </Route>
                              <Route path="/views/public/top5" exact>
                                  <Topfive/>
                              </Route>
                              <Route path="/auth/login">
                                  <Login />
                              </Route>
                              <Route path="/" exact>
                                  <Index data={project}/>
                              </Route>
                              <Route exact path="/public/project/:nom/mproject">
                                  <ProjectMember/>
                              </Route>
                              <Route path="/landing" exact>
                                  <Landing data={member}/>
                              </Route>
                              <Route path="/profile/:prenom" exact>
                                  <Profile data={member}/>
                              </Route>
                            
                            {/*User Routes */}
                            
                            
                              <UserRoute exact path="/admin/project/addproject">
                                  <AddProject/>
                              </UserRoute>
                              <UserRoute exact path="/settings/:prenom">
                                  <Settings data={member}/>
                              </UserRoute>
                              

                             {/*Admin routes */}

                              <AdminRoute exact path="/admin/dashboard">
                                  <Admin membre={member} projet={project}/>:
                              </AdminRoute>
                              <AdminRoute exact path="/admin/member/addmember">
                                  <AddMember/>
                              </AdminRoute>
                              
                              <AdminRoute exact path="/admin/project/:id/update">
                                  <UpdateProject/>
                              </AdminRoute>
                              <AdminRoute exact path="/admin/member/:id/update">
                                  <UpdateMember/>
                              </AdminRoute>
                              <AdminRoute exact path="/admin/check/checkmemberproject">
                                  <CheckProject/>
                              </AdminRoute>
                              <AdminRoute exact path="/admin/member/:membername/allproject">
                                  <MemberProject/>
                              </AdminRoute>
                              <AdminRoute exact path="/admin/delete/projectmember">
                                  <DeleteProjectMember/>
                              </AdminRoute>
                              
                          </Switch>
                      </BrowserRouter>
                    </MemberContextProvider>
                </ProjectContextProvider>
            </CritereContextProvider>
          );
    }
const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
