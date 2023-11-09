type MockKBC_Type = {
    adresa: string
    ime: string
}

type MockAkcija_Type = {
    adresa: string
    vrijemePoc: Date
    vrijemeKraj: Date
    idAkcija: number
    hitna: boolean
    krGrupa?: string 
}


export const mockAkcija : MockAkcija_Type[] = [{
    adresa: "Ul. Ivana Belostenca 2, 42000, Varaždin",
    vrijemePoc: new Date(2023, 12, 21),
    vrijemeKraj: new Date(2024, 1, 21),
    idAkcija: 0,
    hitna: true,
    krGrupa: "AB-" 
}

]


export const mockKBC : MockKBC_Type[] = [{
    adresa: "Ul. Josipa Huttlera 4, 31000, Osijek",
    ime: "KBC Osijek"
},
{
    adresa: "Krešimirova ul. 42, 51000, Rijeka",
    ime: "KBC Rijeka"
},
{
    adresa: "Spinčićeva ul. 1, 21000, Split",
    ime: "KBC Split"
},
{
    adresa: "Dr. Roka Mišetića 2, 20000, Dubrovnik",
    ime: "OB Dubrovnik"
},
{
    adresa: "Ul. Ivana Meštrovića 1, 42000, Varaždin",
    ime: "OB Varaždin"
}]

