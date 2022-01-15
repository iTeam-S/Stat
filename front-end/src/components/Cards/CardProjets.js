import React,{useEffect, useContext,useState} from "react";
import { useHistory } from "react-router";
import ProjectService from "../../utils/service/projectservice"
import { Link } from "react-router-dom";



import { ProjectContext } from "../../utils/context/ProjectContext";

export default function CardProjets() {
  let history=useHistory()
  const {projects,setProjects}=useContext(ProjectContext)

   useEffect(()=>{
     const fetchData=async()=>{
      try {
        const bla=[]
        const response=await ProjectService.GetAll();
        for (let index = 0; index < response.data.length; index++) {
          let proj={}
          let part=[]
          proj['id']=response.data[index].id
          proj['nom_projet']=response.data[index].nom
          proj['total_point']=response.data[index].total_point
          await ProjectService.GetProjectMember(response.data[index].nom).then(res=>{
            for (let i = 0; i < res.data.length; i++) {
              part.push(res.data[i]);
              
            }
          })
          proj['participant']=part
          proj['valide']=response.data[index].valide
          bla.push(proj)
        }
        setProjects(bla);
       } catch (error) {
         console.log(error);
       }
     } 
     fetchData();

   },[])
   console.log(projects);
   const CheckProjectMember=(nom)=>{
    history.push(`/public/project/${nom}/mproject`)
   }


  return (
    <>
      <h3 className="text-3xl font-semibold text-center text-blueGray-600">
            Tous nos projets
      </h3>
      <div className="text-center mt-5 text-pulse-500 font-semibold">
                        <Link to="/views/public/projets">Tout voir</Link><span><a href="view/projet.html">
                        <i className="fa fa-chevron-right"></i></a></span>
                    </div>
      <div className="relative flex flex-col min-w-0 break-words bg-teal-700 w-full mt-6 mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            </div>
          </div>
          <div className=".border-current">
            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-white  bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border-current border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-teal-500 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nom du projet
                </th>
                <th className="px-6 bg-teal-500 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Participants
                </th>
                <th className="px-6 bg-teal-500 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total Points
                </th>
                <th className="px-6 bg-teal-500 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Avancement
                </th>
              </tr>
            </thead>
            <tbody>
            {projects.map((project)=>(
              <tr  key={project.id} >
                <th className="text-white border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {project.nom_projet}
                </th>
                <td onClick={()=>CheckProjectMember(project.nom_projet)} className = "cursor-pointer  border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >

                          <div className="flex container">
                            {project.participant.map((part)=>(
                            <div key={project.participant.id} className="relative z-0">
                              <img src={part.pdc_participant ? part.pdc_participant:require("assets/img/team-1-800x800.jpg").default} alt="..."
                                className = "w-10 h-10 rounded-full  border-2 border-blueGray-50 shadow"/><title>VALIDER</title>
                            </div>
                            
                            ))}
                          </div>
                          
  
                  </td> 
                <td className="text-white border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {project.total_point}
                </td>
                <td className="text-white border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  {project.valide ? "100%":"En cours"}
                </td>
              </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
