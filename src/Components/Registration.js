import { createUserWithEmailAndPassword } from 'firebase/auth';
import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth,db } from './Firebase';
import { setDoc,doc } from 'firebase/firestore';
import {toast} from 'react-toastify';
export default function Registration()
{
    const [username,setUsername] =  useState('');
    const [password,setPassword] =  useState('');
    const [email,setEmail] =  useState('');
    const navigate =  useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log("Regitration : ".user);
            

            if(user){
                await setDoc(doc(db,"User",user.uid),{
                    email:user.email,
                    Username:username,
                    Password:password,
                    logo:""
                })
            }
            navigate("/profile");
            toast.success("User Registration Successfully.",{position:'bottom-center'});
            
        }
        catch(error){
            console.log(error.message);
            toast.error(error.message,{position:'bottom-center'},);
        }
        
    }
    return(
        <div>
            <form  className="form-control" onSubmit={handleSubmit}>
                <h3>Regitration form</h3>
                <label>Username</label>
                <input
                className="form-control"
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                required
                /><br/>

                <label>Email</label>
                <input
                className="form-control"
                type='email'
                placeholder='Email'
                name={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                /><br/>

                <label>Password</label>
                <input
                className="form-control"
                type='password'
                placeholder='Set Password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                /><br/>

                <button type='submit' className="btn btn-success">Registor</button>
                <button className="btn btn-primary" onClick={()=>navigate("/")}>Login</button>
            </form>
        </div>
    )
}

