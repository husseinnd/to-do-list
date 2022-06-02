import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth/auth";

function Home() {
    const navigate = useNavigate();
    const auth = useAuth();

    const logout = (e) => {
        // sure valid so submit
        auth.logout().then(()=>{
            navigate("/login");
        });
      };
    return <div className="home-page">
        <div className="head-section">
            <h2 className="title">To do list</h2>
            <span onClick={logout} >Logout</span>
        </div>
    </div>
}

export default Home;