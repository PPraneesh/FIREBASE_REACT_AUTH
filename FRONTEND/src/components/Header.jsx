import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context-api/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
      {userLoggedIn ? (
        <>
          <button
            onClick={() => {
              signOut(auth).then(() => {
                navigate("/login");
              });
            }}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="text-sm text-blue-600 underline" to={"/login"}>
            Login
          </Link>
          <Link className="text-sm text-blue-600 underline" to={"/register"}>
            Register New Account
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
