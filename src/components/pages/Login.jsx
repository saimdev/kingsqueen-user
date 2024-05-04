import { Button } from "@/components/ui"
import Input from "@/components/ui/FormControls/Input"
import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import useAuth from "../hooks/useAuth"
import useRedirect from "../hooks/useRedirect"



const Login = () => {
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
    })

    const [loginFormInvalid, setLoginFormInvalid] = useState({
        email: false,
        password: false,
    })

    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const [registerFormData, setRegisterFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        regEmail: '',
        regPassword: '',
    })

    const [registerFromInvalid, setRegisterFormInvalid] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    })

    const [registerFormError, setRegisterFormError] = useState({})

    const auth = useAuth();
    const navigate = useNavigate();
    const redirect = useRedirect();


    const loginInputChangeHandler = (event) => {
        const { name, value } = event.target;
        setLoginFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

        setLoginFormInvalid(prev => {
            return {
                ...prev,
                [name]: value.length == 0
            }
        })
    }

    const loginInputBlurHandler = (event) => {
        const { name, value } = event.target;

        setLoginFormInvalid(prev => {
            return {
                ...prev,
                [name]: value.length == 0
            }
        })
    }

    const registerInputChangeHandler = (event) => {
        const { name, value } = event.target;

        setRegisterFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

        setRegisterFormInvalid(prev => {
            return {
                ...prev,
                [name]: value.length == 0
            }
        })
    }

    const registerInputBlurHandler = (event) => {
        const { name, value } = event.target;

        setRegisterFormInvalid(prev => {
            return {
                ...prev,
                [name]: value.length == 0
            }
        })
    }

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        console.log(loginFormData)

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginFormData),
                credentials: 'include',
            })
            const result = await response.json()

            if (response.status == 400) {
                setLoginFormInvalid(result.data)
            } else if (response.status == 401) {
                setInvalidCredentials(true)
            } else if (response.status == 200) {
                auth.login(result.data)

                // Redirect to saved page
                if(redirect.isRedirect()){
                    redirect.applyRedirect();
                    return;
                }
                
                navigate('/account/account-details')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();
        console.log(registerFormData)

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerFormData),
                credentials: 'include',
            })
            const result = await response.json()

            if (response.status == 400) {
                setRegisterFormError(result.data)
            }

            if (response.status == 201) {
                auth.login(result.data)

                // Redirect to saved page
                console.log('Rederect', redirect.isRedirect())
                if(redirect.isRedirect()){
                    redirect.applyRedirect();
                    return;
                }

                navigate('/account/account-details')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="pageContent py-4 flex max-sm:flex-col justify-between">
            <div className="login flex flex-col items-center w-1/2 max-sm:w-full px-20 max-md:px-8 max-sm:px-2">
                <h1 className="uppercase font-bold text-base my-4">Login</h1>

                {
                    invalidCredentials && (
                        <div className="border border-red-500 p-4 text-red-500 text-sm">
                            <p>INVALID LOGIN CREDENTIALS, PLEASE CORRECT YOUR EMAIL ADDRESS/PASSWORD AND SUBMIT AGAIN.</p>
                        </div>
                    )
                }

                <form className="w-full" onSubmit={handleLoginFormSubmit}>
                    <div>
                        <Input type={"email"} name={"email"} id={"email"} label={"Email Address"} required onChange={loginInputChangeHandler} value={loginFormData.email} onBlur={loginInputBlurHandler} invalid={loginFormInvalid.email} invalidMessage={"Please enter your email address"} />
                    </div>

                    <div className="mt-2">
                        <Input className={"mt-4"} type={"password"} name={"password"} id={"password"} label={"Password"} required onChange={loginInputChangeHandler} value={loginFormData.password} onBlur={loginInputBlurHandler} invalid={loginFormInvalid.password} invalidMessage={"Please enter password"} />
                    </div>

                    <Button dark type="submit" buttonClass={"my-8"}>Login</Button>

                    <p className="my-2 text-sm">HAVE YOU FORGOTTEN YOUR PASSWORD?</p>
                    <NavLink className={"underline text-sm"} to={'#'}>CLICK HERE TO RESET</NavLink>
                </form>
            </div>

            <div className="register flex flex-col items-center w-1/2 max-sm:w-full px-20 max-md:px-8 max-sm:px-2 max-sm:pt-8">
                <h1 className="uppercase font-bold text-base my-4">Register</h1>

                <form className="w-full" onSubmit={handleRegisterFormSubmit}>
                    <div>
                        <Input type={"text"} name={"firstName"} id={"firstName"} label={"First Name"} required onChange={registerInputChangeHandler} value={registerFormData.firstName} onBlur={registerInputBlurHandler} invalid={registerFormError.firstName} invalidMessage={registerFormError.firstName ?? ''} />
                    </div>

                    <div className="mt-2">
                        <Input type={"text"} name={"lastName"} id={"lastName"} label={"Last Name"} onChange={registerInputChangeHandler} value={registerFormData.lastName} />
                    </div>

                    <div className="mt-2">
                        <Input type={'date'} name={"dob"} id={"dob"} label={"Date of Birth"} onChange={registerInputChangeHandler} value={registerFormData.dob} />
                    </div>

                    <div className="mt-4">
                        <label>Gender</label><br />
                        <div className="mt-2 flex gap-2">
                            <label><input type="radio" name="gender" value={'male'} onChange={registerInputChangeHandler} checked={registerFormData.gender == 'male'} /> Male</label>
                            <label><input type="radio" name="gender" value={'female'} onChange={registerInputChangeHandler} checked={registerFormData.gender == 'female'} /> Female</label>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Input type={"email"} name={"regEmail"} id={"regEmail"} label={"Email Address"} required onChange={registerInputChangeHandler} value={registerFormData.email} onBlur={registerInputBlurHandler} invalid={registerFormError.regEmail} invalidMessage={registerFormError.regEmail ? registerFormError.regEmail : ''} />
                    </div>

                    <div className="mt-2">
                        <Input type={"password"} name={"regPassword"} id={"regPassword"} label={"Password"} required onChange={registerInputChangeHandler} value={registerFormData.password} onBlur={registerInputBlurHandler} invalid={registerFormError.regPassword} invalidMessage={registerFormError.regPassword ?? ''} />
                    </div>

                    <Button type="submit" dark buttonClass={"my-8"}>Register</Button>

                </form>
            </div>
        </div>
    )
}

export default Login