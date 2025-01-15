/* eslint-disable no-unused-vars */
import { useState } from "react";

const Participation = () => {
  const [add , setAdd]= useState(false);
  const [data , setData] = useState({});

  const handleInputChange =(e)=>{
     setData(...data,
      [e.target.name]= e.target.value
     )
  }

  return (
    <div className="p-4">
      <div className="text-[#0e2f44] font-bold text-2xl">Participation Details</div>
      <div>
        <button onClick={()=>{setAdd(true)}}>Add Participation +</button>
      </div>
      <div>
        {
          add  &&
          <div>
            
          </div>
        }
      </div>
    </div>
  )
}

export default Participation