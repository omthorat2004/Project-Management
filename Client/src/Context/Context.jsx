import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { photoUrlsSelector } from '../Redux/projectsSlice';
export const AuthContext = createContext()
const Context = ({children}) => {
  const urls = useSelector(photoUrlsSelector)
  
  // console.log(token)
  // console.log(urls)
  return (
    <AuthContext.Provider value={{urls}}  >
        {children}
    </AuthContext.Provider>
  );
}

export default Context;
