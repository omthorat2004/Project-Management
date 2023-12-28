
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/Context"
export const usePhotoUrls = (id)=>{
     const {urls} = useContext(AuthContext)
     const [photoUrls,setPhotoUrls] = useState([])
     
     useEffect(()=>{
          const array = urls.filter((obj)=> obj.projectId===id)
          setPhotoUrls(array)
     },[id,urls])
     return [photoUrls]
}