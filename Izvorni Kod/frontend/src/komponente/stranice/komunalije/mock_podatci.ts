type MockKBC_Type = {
    adresa: string
    ime: string
    longitude: number
    latitude: number
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
}, {
    adresa: "Bogatinska ul. 13-1, 10000, Zagreb",
    vrijemePoc: new Date(2023, 12, 26),
    vrijemeKraj: new Date(2024, 1, 28),
    idAkcija: 1,
    hitna: false
}, {
    adresa: "Ul. Mikše Pelegrinovića 25, 10000, Zagreb",
    vrijemePoc: new Date(2023, 12, 30),
    vrijemeKraj: new Date(2024, 2, 5),
    idAkcija: 2,
    hitna: false
}, {
    adresa: "Krbavska ul. 26, 31000, Osijek",
    vrijemePoc: new Date(2023, 12, 7),
    vrijemeKraj: new Date(2024, 2, 17),
    idAkcija: 3,
    hitna: true,
    krGrupa: "B+" 
}, {
    adresa: "Ul. Narodnog preporoda 25, 51500, Krk",
    vrijemePoc: new Date(2024, 1, 26),
    vrijemeKraj: new Date(2024, 3, 29),
    idAkcija: 4,
    hitna: false,
    krGrupa: undefined
}

]


export const mockKBC : MockKBC_Type[] = [{
    adresa: "Ul. Josipa Huttlera 4, 31000, Osijek",
    ime: "KBC Osijek",
    longitude: 45.5600001,
    latitude: 18.67588
},
{
    adresa: "Krešimirova ul. 42, 51000, Rijeka",
    ime: "KBC Rijeka",
    longitude: 45.32691,
    latitude: 14.441
},
{
    adresa: "Spinčićeva ul. 1, 21000, Split",
    ime: "KBC Split",
    longitude: 43.50394,
    latitude: 16.4578
},
{
    adresa: "Dr. Roka Mišetića 2, 20000, Dubrovnik",
    ime: "OB Dubrovnik",
    longitude: 42.64983,
    latitude: 18.07733
},
{
    adresa: "Ul. Ivana Meštrovića 1, 42000, Varaždin",
    ime: "OB Varaždin",
    longitude: 46.30269,
    latitude: 16.32512
},
{
    adresa: "Ljudevita Posavskog 7, 23000, Zadar",
    ime: "OB Zadar",
    longitude: 44.10752,
    latitude: 15.23459
},
{
    adresa: "Petrova 3, 10000, Zagreb",
    ime: "Hrvatski zavod za transfuzijsku medicinu Zagreb",
    longitude: 45.81612,
    latitude: 15.99121
}]

