import { createContext, useContext, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const register = async (data) => {
        const res = await API.post("/auth/register", data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        toast.success("নিবন্ধন সফল!");
    };

    const login = async (data) => {
        const res = await API.post("/auth/login", data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        toast.success("লগইন সফল!");
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        toast.success("লগআউট সফল");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);