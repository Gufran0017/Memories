import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [allMemories, setAllMemories] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    }

    let isLoggedIn = !!token;

    // Logout functionality by removing token
    const LogoutUser = () => {
        setToken('');
        return localStorage.removeItem('token');
    }

    const getAllMemories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/memories', {headers: {Authorization: `Bearer ${token}`}})
            console.log(res.data);
            setAllMemories(res.data.data);
        } 
        catch(error) {
            console.log("Get Memories Error! ",error.response);
            setErrorMsg(error.response.data.msg);
        }
    }

    const updateMemory = async (id, updateData) => {
         try {
            const res = await axios.put(`http://localhost:5000/api/user/memories/${id}`,updateData,
                 {
                    headers: {Authorization: `Bearer ${token}`
                  }
                }
            );
            console.log(res.data);
            setRefresh(prev => !prev);
        } 

        catch (error) {
            console.log("Update Memory error! ", error);
        }
    }

    const deleteMemory = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/user/memories/${id}`, {headers: {Authorization: `Bearer ${token}`}});
            console.log(res.data);
            setRefresh(prev => !prev);
        } 

        catch (error) {
            console.log("Delete Memory error! ", error);
        }
    }

    useEffect(() => {
        getAllMemories();
    }, [refresh]);


    return (
        <AuthContext.Provider value={{storeTokenInLs, isLoggedIn, LogoutUser, allMemories, deleteMemory, setRefresh, updateMemory}}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
}