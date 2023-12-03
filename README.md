# DraculaCharity
Ovaj projekt je rezltat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

DraculaCharity je web aplikacija razvijena s ciljem olakšavanja procesa davanja i skupljanja krvi svim sudionicima ovog procesa. Manjak krvi u nekoj zdravstvenoj ustanovi može dovesti do života teških posljedica, zbog čega je važno pokušati što više pojednostaviti, olakšati i ubrzati ovaj proces.

Zaposlenici Hrvatskog Crvenog Križa lako bi trebali moći stvarati nove akcije, te bi o tim akcijama trebalo moći obavijestiti što više ljudi, a ljudima koji su voljni sudjelovati treba se omogućiti laka prijava bez zabušenja. Naš je cilj pokušati sve to uspješno omogućiti našim korisnicima.

Nadamo se i stjecanju znanja oko toga kako uspiješno organizirati proces stvaranja aplikacije, te i naučiti kako svladati i implementirati sve funkcionalnosti koje si zadajemo u planiranju.


# Funkcijski zahtjevi
Naša aplikacija zamišlena je sa funkcijama prijave korisnika, podržavanjem više korisnika u isto vrijeme te slanje obavijesti unutar aplikacija između korisnika koje su aktualne i odmah vidljive aktivnim korisnicima.

Registrirani korisnici dijele se na Donore Krvi i Zaposlenike Hrvatskog Crvenog Križa (kraće donori i admini). Donori mogu pregledati vlastiti profil i mijenjati ga, vidjeti aktivne lokacije davanja krvi i prijaviti se za darivanje ako zadovoljavaju određene kriterije. Kasnije svoje rezervacije mogu i otkazati.

Admini imaju mogućnost stvaranja novih akcija, obićnih i hitnih. Kad akcija postane aktivna, odmah se prikazuje donorima. Kad hitna akcija postane aktivna, kroz aplikaciju i na mailove donora dolazi obavijest za prijavu kako bi što više ljudi moglo pomoći u hitnom nabavljanju krvi. Također, admin verificira podatke iz registracije korisnika i uređuje ili arhivira već napravljene akcije.


# Tehnologije
Za komunikaciju među timom koristimo Discord, a sa komunikaciju s demosicom i profesorom koristimo MS Teams. Dokumentacija je rađena u latexu, a za dijagrame je korištena stranica [VisualParadigm](https://www.visual-paradigm.com/). 

Za frontend primarno koristimo [React](https://react.dev/) i [ReactQuery](https://tanstack.com/query/v3/), dok za backend spajamo [MySQL](https://www.mysql.com/) i [python3](https://www.python.org/). API endpointe ostvarit će mo korištenjem [FastAPI](https://fastapi.tiangolo.com/). Sigurnost podataka baze čuvamo s [Auth0](https://auth0.com/), Te ćemo aplikaciju postaviti na [Vercel](https://vercel.com/)

# Deployment
Aplikacija je deployana korištenjem aplikacije vercel na [sljedećoj poveznici](https://we-are-adults.vercel.app/)

# Instalcija
Unutar mape projekta/Izvorni Kod/frontend, potrebno je izvrtiti ```npm install```

A unutar mape projekta/Izvorni Kod/backend ```pip install```

Zatim, unutar frontend mape izvršavanjem komande ```npm start``` pokreće se frontend dio projekta, a unutar backend mape ```uvicorn main:app --reload``` pokreće se backend dio aplikacije.

# Članovi tima 
Mentori ovog projekta su prof. [Vlado Sruk](https://www.fer.unizg.hr/vlado.sruk) i demos Mateja Golec. Iva Rengel je voditelj rada na projektu, te ga radi zajedno sa suradnicima Zrinka Cvitanović, Mirta Hrnčić, Nikica Ivandić, Tin Lovreković, Robert Klečar i Josipa Sever.

Pravila o organizaciji tima i kontribucije izdvojene su u datoteci [CONTRIBUTING.md](CONTRIBUTING.md)


## 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)



## 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

