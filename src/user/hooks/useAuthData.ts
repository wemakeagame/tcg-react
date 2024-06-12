import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";


export const useAuthData = (skipRedirection?: boolean) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user && skipRedirection) {
            navigate('/non-authorized');
        }
    }, [user, navigate, skipRedirection])

    return user?.id;
}