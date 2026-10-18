import AppRoutes from "./routes/AppRoutes";
import AuthChecker from "./components/AuthChecker";
import "./App.css";

function App() {

    return (
        <>
            <AuthChecker />

            <AppRoutes />
        </>
    );
}

export default App;