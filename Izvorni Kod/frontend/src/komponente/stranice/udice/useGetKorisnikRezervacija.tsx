import { useQuery } from "@tanstack/react-query"
import { api } from "../../../api"
import { RezervacijaModel } from "../../modeli";

/* vraca rezervacije, je li to kao polje RezervacijaModel ??? */

const getKorisnikRezervacija = (mbo: string): Promise<RezervacijaModel[]> => {
return api.get("/rezervacija/get_my/" + mbo).then((response: any) => response.data);

}

export const useGetKorisnikRezervacija = (mbo:string) => {
    return useQuery<RezervacijaModel[]>({
        queryKey: ["getKorisnikRezervacija", mbo],
        queryFn: () => getKorisnikRezervacija(mbo),
        })
}