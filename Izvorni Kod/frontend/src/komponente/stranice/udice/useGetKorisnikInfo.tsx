import { useQuery } from "@tanstack/react-query"
import { api } from "../../../api"
import { KorisnikModel } from "../../modeli";

const getKorisnikInfo = (mbo: string): Promise<KorisnikModel> => {
return api.get("/korisnik/get_one/" + mbo).then((response: any) => response.data);

}

export const useGetKorisnikInfo = (mbo:string) => {
    return useQuery<KorisnikModel>({
        queryKey: ["getKorisnikInfo", mbo],
        queryFn: () => getKorisnikInfo(mbo),
        })
}