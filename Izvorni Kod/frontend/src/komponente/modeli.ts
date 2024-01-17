export type AkcijaModel = {
    idAkcija: number,
    imeLokacije: string,
    adresa: string,
    datumPoc: Date,
    datumKraj: Date,
    hitna: boolean,
    krgrupa?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-",
    mail: string,
    geo_sirina: number,
    geo_duzina: number
}

export type AkcijaSlanjeModel = {
    idAkcija: number,
    imeLokacije: string,
    geo_sirina: number,
    geo_duzina: number,
    adresa: string,
    datumPoc: string,
    datumKraj: string,
    hitna: boolean,
    krgrupa?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-",
    mail: string
}

export type KBCModel = {
    ime: string,
    adresa: string,
    geo_sirina: number,
    geo_duzina: number
}

export type KorisnikModel = {
    mbo: string,
    oib: string,
    ime: string,
    prezime: string,
    spol: "Muško" | "Žensko",
    dob: number,
    krgrupa: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-",
    mjstan: string,
    favkbc: string,
    verificiran: boolean,
}

    export type LoginInfoModel = {
    mail: string,
    lozinka: string,
    mbo: string,
}

    export type RezervacijaModel = {
    idRezervacija: number,
    vrijemePoc: Date,
    imeLokacije: string,
    mbo: string,

}

export type RezervacijaSlanjeModel = {
    idRezervacija: number,
    vrijemePoc: string,
    imeLokacije: string,
    mbo: string,

}

    export type TerminModel = {
    idTermin: number,
    imeLokacije: string,
    datum: Date,
    vrijemePoc: Date,
    vrijemeKraj: Date,
    zauzeto: boolean,
}

    