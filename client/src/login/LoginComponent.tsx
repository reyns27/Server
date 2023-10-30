import { Link } from "react-router-dom"
import { AuthLogin, profileResquest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
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



        await profileResquest(user.Id).then(({ data }) => {
            setProfile(data);
            return Navigate('/dashboard');
        });
    }
    return (
        <div>
            <div>
                <main className="mt-0 transition-all duration-200 ease-soft-in-out">
                    <section>
                        <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
                            <div className="container z-10">
                                <div className="flex flex-wrap mt-0 -mx-3">
                                    <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                                        <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                            <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                                <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Welcome back</h3>
                                                <p className="mb-0">Enter your email and password to sign in</p>
                                            </div>
                                            <div className="flex-auto p-6">
                                                <form role="form" onSubmit={HandleSubmit}>
                                                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Email</label>
                                                    <div className="mb-4">
                                                        <input type="email" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                                                    </div>
                                                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Password</label>
                                                    <div className="mb-4">
                                                        <input type="password" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                                                    </div>
                                                    <div className="min-h-6 mb-0.5 block pl-12">
                                                        <input id="rememberMe" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" defaultChecked />
                                                        <label className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700" htmlFor="rememberMe">Remember me</label>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Sign in</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                                <p className="mx-auto mb-6 leading-normal text-sm">
                                                    Don't have an account?
                                                    <a href="../pages/sign-up.html" className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Sign up</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                                        <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                                            <div className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10" style={{ backgroundImage: 'url("/src/assets/img/curved-images/curved6.jpg")' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="py-12">
                    <div className="container">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-shrink-0 w-full max-w-full mx-auto mb-6 text-center lg:flex-0 lg:w-8/12">
                                <Link to="#" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12" > Company </Link>
                                <Link to="#" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> About Us </Link>
                                <Link to="#" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Team </Link>
                                <Link to="#" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Products </Link>
                                <Link to="#" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Blog </Link>
                                <Link to="#" target="_blank" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12"> Pricing </Link>
                            </div>
                            <div className="flex-shrink-0 w-full max-w-full mx-auto mt-2 mb-6 text-center lg:flex-0 lg:w-8/12">
                                <Link to="#" target="_blank" className="mr-6 text-slate-400">
                                    <span className="text-lg fab fa-dribbble" />
                                </Link>
                                <Link to="#" target="_blank" className="mr-6 text-slate-400">
                                    <span className="text-lg fab fa-twitter" />
                                </Link>
                                <Link to="#" target="_blank" className="mr-6 text-slate-400">
                                    <span className="text-lg fab fa-instagram" />
                                </Link>
                                <Link to="#" target="_blank" className="mr-6 text-slate-400">
                                    <span className="text-lg fab fa-pinterest" />
                                </Link>
                                <Link to="#" target="_blank" className="mr-6 text-slate-400">
                                    <span className="text-lg fab fa-github" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
                                <p className="mb-0 text-slate-400">
                                    Copyright ©
                                    Soft by Creative Tim.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    )
}

export default LoginComponent
