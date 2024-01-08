import React, {useState} from "react";
import { Container, FormContainer, OuterContainer, Toggle, ToggleContainer, TogglePanel } from "../stilovi";


export default function StvaranjeAkcija() {
    const [hitnaAkcija, setHitnaAkcija] = useState(false);
    
    const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
       setHitnaAkcija(e.target.checked);
    };
    return(
        <OuterContainer>
        <Container>
          <FormContainer>
            <form target="_self" action="/">
                <input type="text" name="naziv" id="naziv" placeholder="Naziv akcije..."required/>
                <input type="text" name="adresa" id="adresa" placeholder="Adresa..." required/>
                <input type="datetime-local" id="pocetak" name="pocetak" placeholder="Datum početka..." required/>
                <input type="datetime-local" id="kraj" name="kraj" placeholder="Datum kraja..." required/>
                <br/>
                <input type="checkbox" name="hitna" value="hitna" onChange={handleCheckboxChange}/>Hitna akcija
                {hitnaAkcija && (
                <label>Krvna grupa: <select name="krvna-grupa" id="krvna-grupa">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="0">0</option>
                </select></label>
                )}
            <br/>
            <br/>
            

            <button type="submit">Stvori akciju</button>
            </form>
            </ FormContainer>

            <ToggleContainer>
            <Toggle>
              <TogglePanel>
                <h1>Nova akcija!</h1>
                <p>Unesite potrebne podatke za stvaranje<br></br> željene nove akcije doniranja krvi Crvenog križa</p>
                
              </ TogglePanel>
            </ Toggle>
          </ ToggleContainer>
        </ Container>
        </OuterContainer>
    )
}