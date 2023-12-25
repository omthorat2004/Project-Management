import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { photoUrlsSelector } from '../Redux/projectsSlice';
export const AuthContext = createContext()
const Context = ({children}) => {
  const urls = useSelector(photoUrlsSelector)
  const [currentProjectId,setId] = useState()
  // console.log(token)
  // console.log(urls)
  return (
    <AuthContext.Provider value={{urls,currentProjectId,setId}}  >
        {children}
    </AuthContext.Provider>
  );
}

export default Context;
