import { Navigate } from "react-router-dom";
import LoginBox from "../components/Auth_component/LoginBox";
import { useAuth } from '../function/AuthContext'

const LoginPage: JSX.ElementType = () => {

    const { isLoggedIn } = useAuth();

    return (
        <main className="blackground-css">
            {isLoggedIn ? (
                <><Navigate to='/' /></>
            ) : (
                <>
                    <LoginBox />
                </>
            )}

        </main>
    )
}

export default LoginPage