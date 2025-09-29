import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // ✅ Use Vite env variable
    const api = import.meta.env.VITE_API_URL;

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [allMemories, setAllMemories] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Store token in localStorage
    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken);
    };

    const isLoggedIn = !!token;

    // Logout user
    const LogoutUser = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    // Get all memories
    const getAllMemories = async () => {
        try {
            const res = await axios.get(`${api}/api/user/memories`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAllMemories(res.data.data);
        } catch (error) {
            console.log("Get Memories Error!", error?.response || error);
            setErrorMsg(error?.response?.data?.msg || 'Error fetching memories');
        }
    };

    // Update a memory
    const updateMemory = async (id, updateData) => {
        try {
            const res = await axios.put(
                `${api}/api/user/memories/${id}`,
                updateData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRefresh(prev => !prev);
        } catch (error) {
            console.log("Update Memory Error!", error?.response || error);
        }
    };

    // Delete a memory
    const deleteMemory = async (id) => {
        try {
            const res = await axios.delete(`${api}/api/user/memories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRefresh(prev => !prev);
        } catch (error) {
            console.log("Delete Memory Error!", error?.response || error);
        }
    };

    useEffect(() => {
        if (token) getAllMemories();
    }, [refresh, token]);

    return (
        <AuthContext.Provider value={{
            storeTokenInLs,
            isLoggedIn,
            LogoutUser,
            allMemories,
            deleteMemory,
            setRefresh,
            updateMemory,
            errorMsg
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
