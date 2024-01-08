import { useQuery } from "@tanstack/react-query"
import { api } from "../../../api"
import { LoginInfoModel } from "../../modeli"

const getLoginInfo = (email: string): Promise<LoginInfoModel> => {
    console.log(email);
return api.get("/loginInfo/get_one/" + email).then((response: any) => response.data);

}

export const useGetLoginInfo = (email:string) => {
    return useQuery<LoginInfoModel>({
        queryKey: ["getLoginInfo", email],
        queryFn: () => getLoginInfo(email),
        })
}