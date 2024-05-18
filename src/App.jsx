import Routes from "./routes/Routes";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
