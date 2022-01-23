import CardStats from "./CardStats"
import React,{useState,useEffect} from "react";
import ProjectService from "../../utils/service/projectservice";
import MemberService from "../../utils/service/memberservice";


export default function Simplestat(){
     const [projectval,setProjval]=useState([]);
  const [memberact,setMemberact]=useState(0);
  const [freqmemberact,setFreqmemberact]=useState(0);

  useEffect(()=>{
    async function fetchData(){
    const memberT=20;
    try {
      await ProjectService.getAllvalide().then(response=>{
        if(response.data.length==null){
          setProjval(0)
        }
        setProjval(response.data.length)
      })
      await MemberService.listmemberonproject().then(response=>{
        if(response.data.length==null){
          setMemberact(0)
        }
        setMemberact(response.data.length);
        let eff=((response.data.length)*100)/memberT;
        setFreqmemberact(eff);
      })
      
    } catch (error) {
      console.log(error);
      
    }
  }
  fetchData()
  },[])

     return (
<<<<<<< HEAD
          <div className="flex flex-wrap">
=======
          <div className="w-full flex flex-wrap justify-center md:ml-96">
>>>>>>> 2530a34b00256dd91e1e29ff3170a11dd2b29f1f
               <div className="w-full lg:w-9/12 xl:w-3/12 px-4">
                    <CardStats
                    statSubtitle="PARTICIPATION"
                    statTitle={memberact}
                    statArrow="up"
                    statPercent={freqmemberact}
                    statPercentColor="text-emerald-500"
                    statDescripiron="Membres en projets"
                    statIconName="fas fa-users"
                    statIconColor="bg-teal-500"
                    />
               </div>
               <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                    statSubtitle="COMMIT"
                    statTitle="2,356"
                    statArrow="down"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-chart-pie"
                    statIconColor="bg-red-500"
                    />
               </div>
               <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                    statSubtitle="PRODUCTION"
                    statTitle={projectval}
                    statArrow="up"
                    statPercent="18"
                    statPercentColor="text-emerald-500"
                    statDescripiron="Depuis l'année dernier"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-orange-500"
                    />
               </div>
      </div>
     )
}