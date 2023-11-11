import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import drakula from './drakula.gif';



export const Registration = () => {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(4).max(10).required(),
        confirmPasswod: yup
            .string()
            .oneOf([yup.ref("password"), null])
            .required(),
        gender: yup.string().required(),


    });


    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        <div className="container">
            <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>Unesite tražene podatke<br></br>i izradite korisnički račun</span>
                <br></br>
                <input type="text" placeholder="Ime..." {...register("firstName")}/>
                <input type="text" placeholder="Prezime..." {...register("lastName")} />
                <input type="text" placeholder="Email..." {...register("email")}/>
                <input 
                    type="password" 
                    placeholder="Lozinka.." 
                    {...register("password")}
                />
                <input 
                    type="password" 
                    placeholder="Potvrda lozinke..." 
                    {...register("confirmPassword")}
                />
                <input type="text" placeholder="M/Ž" {...register("gender")}/>
                <button>Registrirajte se</button>
                 {/* <input type="submit"/>  */}
            </form>
            </div>


                 <div class="toggle-container">
                    <div class="toggle">
                        <div class="toggle-panel toggle left">
                            <img className="drakulica" src={drakula} ></img>
                            <h1>Dobrodošli natrag!</h1>
                            <p>Prijavite se za korištenje svih mogućnosti</p>
                            <button id="login">Prijavi se</button>
                        </div>
                    </div>
                 </div>


        </div>
    );
}