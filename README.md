# WeAreAdults
Dobrodošli u repozitorij naše grupe. Ovjde će te moći pronaći opis projektnog zadatka, raspored trenutnih poslova te upute kako ga pokrenuti.
Upute će biti dodane kasnije

# Aktialni raspored poslova
### Zrinka Cvitanović
- obrasci uporabe za verifikaciju korisnika (UC13), dodavanje termin dane krvi u povijest davanja (UC14) i za glavni meni (UC15)
- itrada UML dijagrama obrasca uporabe _administrator - korisnik_
- izrada UML dijagrama obrasca uporabe _administrator - baza podataka_

### Mirta Hrnčić
- obrasci uporabe za pregledavanje aktivnih lokacija davanja krvi (UC1), pregled informacija (UC2) i prijava (UC3)

### Nikica Ivandić
- obrasci uporabe za registraciju (UC4), rezervacija termina (UC5), pregledavanje profila (UC6) 

### Robert Klečar
- obrasci uporabe za dodavanje (UC10), uređivanje (UC11) i arhiviranje povremenih akcija (UC12) davanja krvi Hrvatski Crvenog Križa

### Tin Lovreković
- obrasci uporabe za odjavu (UC7), otkazivanje termina (UC8), uređivanje nekih osobnih informacija (adresa, primarni KBC) (UC9) 

### Iva Rengel
- pisanje opisa projetknog zadatka
- raspisavanje ovog dokumenta

### Josipa Sever
- izrada dokumentacije
- spajanje obrazada uporabe i dijagrama u dokument
- izrada UML dijagrama obrasca uporabe _gost - administrator_


# Donori Krvi - projektni zadatak
Naš zadatak svodi se na izradu programske potpore za web aplikaciju (trenutno nema ime) koja će služiti tome da svim donorima i zaposlenicima Hrvatskog Crvenog Križa olakša neke akcije vezane za darivanje krvi. 

Ukratko, koristeći našu aplikaciju, korisnici zainteresirani za davanje krvi moći će se prijaviti u sustav, pregledavati sve aktivne lokacije davanja krvi, prijavljivati se na njih i rezervirati termine, te pregledavati neke osnovne informacije o aplikaciji i Hrvatskiom Crvenom Križu, te o podacima svog profila.

Zaposlenici Hrvatskog Crvenog Križa moći će pregledavati koliko ljudi će prisustvovati određenoj akciji, te će moći upisivati sva darivanja koja će se prikazivati na našoj aplikacji. Moći će organizirati i uređivati povremene akcije darivanja krvi koje se mogu održati na bilo kojoj aplikaciji, i najvažnije, sa hitnom porukom moći će obavijestiti sve korisnike o nedostatku krvi na određenom području.

Lokacije na kojima je moguće dati krv sastoje se od dva tipa lokacija zasnovanih na stalnosti termina za davanje krvi:
1. Zdravstvene ustanove sa stalnim terminima
2. Lokacije privremenih akcija koje organizira Hrvatski Crveni Križ

U prvu kategoriju spadaju KBC Osijek, KBC Rijeka, KBC
Split, OB Dubrovnik, OB Varaždin, OB Zadar i Hrvatskom zavodu za transfuzijsku medicinu Zagreb. 

Korisnici koji će koristiti našu aplikaciju dijele se u tri kategorije: gost, korisnik, i admin. Potreba za ova tri moda korižtenja aplikacije proizlaze iz toga da dio aplikacije treba biti vidljiv i još neprijavljenim korisnicima, i toga da prosječan donor krvi te zaposlenik Hrvatskog Crvenog Križa koriste aplikaciju na znatno različite načine.
- **gost** - način korištenja aplikacije kada korisnik nije prijavljen u sustav. U ovom modu moguće je prijaviti se ili registrirati novi korisnički račun. Osim toga, moguć je pregled svih lokacija vađenja krvi, i onih stalnih i trenutno aktivnih povremenih akcija, ali bez mogućnosti naručivanja termina. Također, gostu je dostupna stranica sa osnovnim informacijama o aplikaciji i Hrvatskom Crvenom Križu.
- **korisnik** - kad se gost prijavi u sustav, jedna od mogućih opcija je napraviti račun za donora krvi. Takav račun nazivamo korisnik. U ovom modu korištenja aplikacije korisnik može napraviti sve što i gost, sa još dodatnim funkcionalnostima. Kod pregleda lokacija, prikazuje mu se gumb koji ga vodi na odabit termina i rezervaciju istog. Dostupna mu je i mogućnost pregleda vlastitog profila s brojnim informacijama koje će mo u detalje navesti kasnije. Također, kad admin pošalje obavijest za hitnom akcijom, korisnik dobiva poruku na mail. Kad stitne na link u mailu, ili pristupi aplikaciji preusmjerit će se na stranicu na kojoj ima mogućnost odazvati se na hitni poziv.
- **admin** - dalje u tekstu nazvan i Hrvatski Crveni Križ ili samo Crveni Križ. Također ima sve opcije iste kao i gost s još nekim dodatnim mogućnostima. Admin verificira korisnika koji se registrira, nakon čega se korisnik može prijaviti u sustav. Također, dodaje i manipulira akcijama darivanja krvi. Može zapisivati kad je netko 
 