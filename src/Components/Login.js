import React,{useState,useEffect} from 'react'
import ApiService from "../ApiService"
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [token,setToken] = useCookies(['mytoken'])
    const [isLogin,setIsLogin] = useState(true)
    let history = useHistory()

    useEffect(() => {
        if (token['mytoken']){
            history.push('/articles')
        }
    },[token])

    const loginBtn = () => {
        ApiService.LoginUser({username,password})
        .then(resp => setToken('mytoken',resp.token))
        .catch(error => console.log(error))
    }
   const registerBtn = () => {
        ApiService.RegisterUser({username, password})
        .then(() =>  loginBtn())
        .catch(error =>console.log(error))


    }
    return (
        <div className="App">
        <br />
        <br />
        {isLogin ?<h2>Login</h2> : <h2>Register</h2>}
            

            <div className="mb-3">
            <label htmlFor="username" className="form-label">username</label>
            <input onChange={e => setUserName(e.target.value)} value={username} type ="text" id ="username" className="form-control" placeholder="Please enter username" />

             <label htmlFor="password" className="form-label">password</label>
            <input onChange={e => setPassword(e.target.value)} value={password} type ="password" id="password" className="form-control" placeholder="Please enter password" />

            <br />
            {isLogin ? <button onClick={loginBtn} className="btn btn-primary">Login </button> :  <button onClick={registerBtn} className="btn btn-primary">Register </button> }
            

            <div className="mb-3">
           
            {isLogin ? <h5>
                        Or
                    <button className="btn btn-primary" onClick={() => setIsLogin(false)}>Register</button>
                        </h5>
                        :
            <h5>Or  <button className="btn btn-primary" onClick={() => setIsLogin(true)}>Login</button></h5>
            }
            
            </div>
        </div>
        </div>
    )
}

export default Login
