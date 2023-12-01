import React, {useState} from "react";
import { Outlet } from 'react-router-dom'
import { NovaAkcija } from "../stilovi";

export default function StvaranjeAkcija() {
    const [hitnaAkcija, setHitnaAkcija] = useState(false);
    
    const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
       setHitnaAkcija(e.target.checked);
    };
    return(
        <><NovaAkcija>
            <h1>Unesi novu akciju</h1>
            <form target="_self" action="/">
                <label>Naziv akcije: <input type="text" name="naziv" id="naziv" required/></label>
                <br/>
                <label>Adresa: <input type="text" name="adresa" id="adresa" required/></label>
                <br/>
                <label>Početak: <input type="datetime-local" id="pocetak" name="pocetak" required/></label>
                <br/>
                <label>Kraj:  <input type="datetime-local" id="kraj" name="kraj" required/></label>
                <br/>
                <label><input type="checkbox" name="hitna" value="hitna" onChange={handleCheckboxChange}/>Hitna akcija</label>
                <br/>
                {hitnaAkcija && (
                <label>Krvna grupa: <select name="krvna-grupa" id="krvna-grupa">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="0">0</option>
                </select></label>
                )}
            <br/>

            <input type="submit" value="Submit"></input>
            </form>
            <br/>
            </NovaAkcija></>
    )
}