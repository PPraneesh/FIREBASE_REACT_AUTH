import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context-api/auth";
import { toast } from "react-toastify";
import axios from "axios";


const Home = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
    const [hobbies, setHobbies] = useState('');
  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/hobbies",{
        email: currentUser.email,
        hobby: hobbies
    })
    .then(()=>{
        setHobbies('')
        toast.success('hobbie added :)')
    })
    .catch((error)=>{
        console.log(error)
    })
  };
  const { currentUser } = useAuth();
  return (
    userLoggedIn && (
      <div className="text-2xl font-bold pt-14">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.

        <form >
            <input type="text" placeholder="Enter your hobby" onChange={(e)=>{
                setHobbies(e.target.value)
            }} />
            <button onClick={onSubmit}>Add Hobby</button>
        </form>
      </div>
    )
  );
};

export default Home;
