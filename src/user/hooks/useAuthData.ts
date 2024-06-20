import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";


export const useAuthData = (redirect?: boolean) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user && redirect) {
            navigate('/non-authorized');
        }
    }, [user, navigate, redirect])

    return user;
}