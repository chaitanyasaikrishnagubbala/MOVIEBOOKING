import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthChecker() {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {

            // JWT format:
            // header.payload.signature

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const expirationTime = payload.exp * 1000;

            const currentTime = Date.now();

            // Token already expired
            if (expirationTime <= currentTime) {

                localStorage.removeItem("token");

                navigate("/login");

                return;
            }

            // Calculate remaining time
            const remainingTime =
                expirationTime - currentTime;

            // Automatically logout when JWT expires
            const timer = setTimeout(() => {

                localStorage.removeItem("token");

                alert("Your session has expired. Please login again.");

                navigate("/login");

            }, remainingTime);

            return () => clearTimeout(timer);

        } catch (error) {

            console.error(
                "Invalid token:",
                error
            );

            localStorage.removeItem("token");

            navigate("/login");
        }

    }, [navigate]);


    return null;
}

export default AuthChecker;