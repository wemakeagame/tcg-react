import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";


export const useAuthData = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/non-authorized');
        }
    }, [user, navigate])

    return user?.id;
}