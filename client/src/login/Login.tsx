import { Link } from "react-router-dom"



const Login = () => {
  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('../src/assets/bg.jpg')" }}>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-whitefont-bold text-center mb-6">Login</h1>
        <form>
          <div className="relative my-4">
            <input type="email" placeholder=" "
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Email</label>
          </div>
          <div className="relative my-4">
            <input type="password" placeholder=" "
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" />
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Password</label>
          </div>
          <div>
            <div>
              <input type="checkbox" />
              <label htmlFor="">
                Remember Me</label>
            </div>
            <span>Forgot Password?</span>
          </div>
          <button type="submit">Login</button>
          <div>
            <span>New Here? <Link to='Register'>Create an Account</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login