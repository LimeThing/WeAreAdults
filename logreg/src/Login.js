import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import drakula from './drakula.gif';



export const Login = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(4).max(10).required(),


    });


    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        
        <div className="container">

            <div className="form-container2 sign-in">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Dobro došli!</h1>
                <br></br>
                <span>Unesite svoj email i lozinku</span>
                <br></br>
            
                <input type="text" placeholder="Email..." {...register("email")}/>
                <p> {errors.email?.message} </p>
                <input 
                    type="password" 
                    placeholder="Password..." 
                    {...register("password")}
                />
                <p> {errors.password?.message} </p>
                <button>Prijavi se</button>
                 {/* <input type="submit"/>  */}
                 </form>
                 </div>


                 <div className="toggle-container2">
                    <div className="toggle2">
                        <div className="toggle-panel toggle-right">
                            <img className="drakulica" src={drakula} ></img>
                            <h1>Prvi put?</h1>
                            <p>Unesite svoje podatke i napravite korisnički račun</p>
                            <button id="register">Registriraj se</button>
                        </div>
                    </div>
                 </div>

        </div>
    );
}