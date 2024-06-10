import { useContext, useEffect } from "react";
import { Page } from "../../core/components/Page"
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";


export const UserLandingPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/non-authorized');
        }
    }, [user, navigate])

    return<Page>
         Player landing page.
        </Page>
}