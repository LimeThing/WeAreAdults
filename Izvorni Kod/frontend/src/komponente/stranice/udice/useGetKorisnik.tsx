import { useQuery } from "@tanstack/react-query"
import { api } from "../../../api"

const getKorisnikIme = (mbo: string): Promise<string> => {
return api.get("/korisnik/get_names_one/" + mbo).then((response: any) => response.data);

}

export const useGetKorisnikIme = (mbo:string) => {
    return useQuery<string>({
        queryKey: ["getKorisnikIme", mbo],
        queryFn: () => getKorisnikIme(mbo),
        enabled: (mbo !== ""),
        })
}