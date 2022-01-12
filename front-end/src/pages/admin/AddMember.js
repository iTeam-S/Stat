import {useHistory} from "react-router"
import React,{useState,useContext} from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



import { MemberContext } from "../../utils/context/MemberContext";
import projectservice from "../../utils/service/projectservice";


export default function AddMember() {
    const validationSchema = Yup.object().shape({
        membername: Yup.string()
          .required('membername  is required'),
          projectname: Yup.string()
          .required('Projectname is required')
      });
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });
    let history=useHistory();
    const {addMember} =useContext(MemberContext)

    const handleAddmember=async(data)=>{
        try {
            const response=await projectservice.addMember(data.membername,data.projectname);
            const red=await history.push("/admin/dashboard");
            addMember(response.data);
            
        } catch (error) {
            console.log(error);
            
        };
        
    }
    return ( 
        <>
            <div className = "container mx-auto px-4 h-full" >
                <div className = "flex content-center items-center justify-center h-full" >
                    <div className = "w-full lg:w-6/12 px-4" >
                        <div className = "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0" >
                            <div className = "rounded-t mb-0 px-6 py-6" >
                                <div className = "text-center mb-3" >
                                    <h6 className = "text-blueGray-500 text-sm font-bold" >Ajouter un membre à un projet</h6> 
                                </div> 
                            </div> 
                            <div className = "flex-auto px-4 lg:px-10 py-10 pt-0" >
                                <form onSubmit={handleSubmit(handleAddmember)}>
                                    <div className = "relative w-full mb-3" >
                                        <label className = "block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor = "membername" >Nom</label> 
                                        <input type = "text" name="membername" className = "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder = "Nom du membre(en majuscule)" id="membername" {...register('membername')}/>
                                        <p className="text-red-500 italic">{errors.membername?.message}</p>
                                    </div>
                                    <div className = "relative w-full mb-3" >
                                        <label className = "block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor = "prenom" >Prenom</label> 
                                        <input type = "text" className = "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder = "Prenom du membre" id="prenom" />
                                    </div>
    
    
                                    <div className = "relative w-full mb-3" >
                                        <label className = "block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor = "projectname" >Nom_du_projet</label> 
                                        <input type = "text" name="projectname" id="projectname"   className = "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  placeholder = "Nom du projet" {...register('projectname')} />
                                        <p className="text-red-500 italic">{errors.projectname?.message}</p>
                                    </div>
                                    
                                    <div className = "text-center mt-6" >
                                        <input type="submit" className = "bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" value="Valider"/> 
                                    </div> 
                                </form> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </>
    );
}