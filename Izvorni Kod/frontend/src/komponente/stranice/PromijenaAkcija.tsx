import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { ListItem, Name, PopupContainer, VerifyButton } from "../stilovi";
import { AkcijaModel } from "../modeli";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  ID: number;
  Lokacija: string;
  Adresa: string;
  Početak: Date;
  Kraj: Date;
  email: string;
  password: string;
}


export default function Akcije() {
  const [email, setEmail] = useState<string>("");
  const onSubmit = (data: FormData) => {
    console.log(data);
    setEmail(data.email);
  };

  const schema = yup.object().shape({
    ID: yup.number().required(),
    Lokacija: yup.string().required(),
    Adresa: yup.string().required(),
    Početak: yup.date().required(),
    Kraj: yup.date().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(10).required(),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [akcije, setAkcije] = useState<AkcijaModel[]>([]);
  const queryClient = useQueryClient();

  const fetchAkcija = (): Promise<AkcijaModel[]> =>
    api.get("/akcija/get_all/").then((response: any) => response.data);

  const { isLoading, data } = useQuery<AkcijaModel[]>({
    queryKey: ["getAkcija"],
    queryFn: fetchAkcija,
  })

  const {mutate: mijenjajAkciju} = useMutation({
    mutationFn: (idAkcija: number) => {
      return api.put('/akcija/edit/', idAkcija)
    }
  })

  const handlePromjenaAkcije = (idAkcija: number) => {
    mijenjajAkciju(idAkcija);
    queryClient.invalidateQueries({queryKey: ["getAkcija"]});
  };

  useEffect(() => {
    setAkcije(data ? data : [])
  }, [data]);
  const [hitnaAkcija, setHitnaAkcija] = useState(false);
  const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setHitnaAkcija(e.target.checked);
 };

  if (isLoading) return <></>;
  else
    return (
      <><PopupContainer>
      <form onSubmit={handleSubmit(onSubmit)}>

        <span>Unesite promijene</span>
        <br></br>

        <input type="text" placeholder="ID" {...register("ID")} />
        <input type="text" placeholder="Lokacija" {...register("Lokacija")} />
        <input type="text" placeholder="Adresa" {...register("Adresa")} />
        <input type="date" placeholder="Početak" {...register("Početak")} />
        <input type="date" placeholder="Kraj" {...register("Kraj")} />
        <input type="checkbox" placeholder="Hitno" onChange={handleCheckboxChange}/>
        {hitnaAkcija && (
                <label>Krvna grupa: <select name="krvna-grupa" id="krvna-grupa">
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="0+">0+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                    <option value="0-">0-</option>
                </select></label>
                )}
        
        <button type="submit">Prijavi se</button>
        <p> 
        {errors.ID?.message} 
        {errors.Lokacija?.message} 
        {errors.Adresa?.message} 
        {errors.Početak?.message} 
        {errors.Kraj?.message}
        </p>
      </form>
    </PopupContainer>
    
      <div>
        <ul>
          {akcije.map((akcija) => (
            <><ListItem key={akcija.idAkcija}>
              <Name>{`ID: ${akcija.idAkcija}`}</Name>
              <Name>{`Lokacija: ${akcija.imeLokacije}`}</Name>
              <Name>{`Adresa: ${akcija.adresa}`}</Name>
              <Name>{`Početak: ${akcija.datumPoc}`}</Name>
              <Name>{`Kraj: ${akcija.datumKraj}`}</Name>
              <Name>{`Hitno: ${akcija.hitna}`}</Name>
              <Name>{`Krvna grupa: ${akcija.krgrupa}`}</Name>
              <VerifyButton onClick={() => handlePromjenaAkcije(akcija.idAkcija)}>
                Promijeni!
              </VerifyButton>
            </ListItem>
            </>
          ))}

        </ul>
      </div></>
    );
}
