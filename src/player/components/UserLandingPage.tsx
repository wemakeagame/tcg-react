import { Page } from "../../core/components/Page"
import { useAuthData } from "../hooks/useAuthData";


export const UserLandingPage = () => {
    const userId = useAuthData();

    return<Page>
         Player landing page. {userId}
        </Page>
}