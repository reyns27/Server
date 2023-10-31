import { Link } from "react-router-dom"
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from "react-icons/ai";
import { AuthLogin, profileResquest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const setToken = useAuthStore(state => state.setToken);
  const setProfile = useAuthStore(state => state.setProfile);
  const Navigate = useNavigate();
  
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    const { user } = await AuthLogin(email, password).then(data => {
      console.log(data.data.Token);
      setToken(data.data.Token);
      return data.data;
      
    });

   
    await profileResquest(user.Id).then(({data}) => {
      setProfile(data);
      return Navigate('/dashboard');
    });


   
  }
  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('../src/assets/bg.jpg')" }}>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
        <form onSubmit={HandleSubmit}>
          <div className="relative my-4">
            <input type="email" placeholder=" "
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Email</label>
            <BiUser className="absolute top-4 right-4" />
          </div>
          <div className="relative my-4">
            <input type="password" placeholder=" "
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Password</label>
            <AiOutlineUnlock className="absolute top-4 right-4" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" />
              <label htmlFor="">
                Remember Me</label>
            </div>
            <Link to={'/reset/password'} className="text-blue-500">Forgot Password?</Link>
          </div>
          <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300">Login</button>
          <div>
            <span className="m-4">New Here? <Link to='Register' className="text-blue-500">Create an Account</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login