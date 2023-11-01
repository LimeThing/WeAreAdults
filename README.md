# WeAreAdults
Dobrodošli u repozitorij naše grupe. Ovdje će te moći pronaći opis projektnog zadatka i upute kako pokrenuti projekt.

# Upute za pokretanje aplikacije
Zahtjevi: skinut npm, react (pomoću reacta), pip, uvicorn (pomoću pipa)
Za svaki operacijski sustav se skidaju na različite načine, pa ako ih već nemate probajte samo proguglat kako se skidaju

Aplikacija se pokreće pokretanjem dva terminala, unutar mape *Izvorni kod*, jedan u mapi *frontend* i jedan u mapi *backend* te izvršavanjem sljedećih naredbi:

- frontend:
```npm start```
- backend:
```uvicorn main:app --reload```

# Donori Krvi - projektni zadatak
Naš zadatak svodi se na izradu programske potpore za web aplikaciju (trenutno nema ime) koja će služiti tome da svim donorima i zaposlenicima Hrvatskog Crvenog Križa olakša neke akcije vezane za darivanje krvi. 

Ukratko, koristeći našu aplikaciju, korisnici zainteresirani za davanje krvi moći će se prijaviti u sustav, pregledavati sve aktivne lokacije davanja krvi, prijavljivati se na njih i rezervirati termine, te pregledavati neke osnovne informacije o aplikaciji i Hrvatskiom Crvenom Križu, te o podacima svog profila.

Zaposlenici Hrvatskog Crvenog Križa moći će pregledavati koliko ljudi će prisustvovati određenoj akciji, te će moći upisivati sva darivanja koja će se prikazivati na našoj aplikacji. Moći će organizirati i uređivati povremene akcije darivanja krvi koje se mogu održati na bilo kojoj aplikaciji, i najvažnije, sa hitnom porukom moći će obavijestiti sve korisnike o nedostatku krvi na određenom području.

Cilj ove aplikacije je modernizirati spremanje i prikaz podataka vezanih uz darivanje krvi, automatizirati i olakšati proces naručivanja pa tako i skratiti vrijeme čekanja u redu. Automatizirati proces izdaje potvrda nakon dovoljno sakupljenih darivanja te proširiti i olakšati cijeloj populaciji dolazak do informacija vezanih uz moguća mjesta darivanja krvi pa tako i povećati volumen darovane krvi.

Lokacije na kojima je moguće dati krv sastoje se od dva tipa lokacija zasnovanih na stalnosti termina za davanje krvi:
1. Zdravstvene ustanove sa stalnim terminima
2. Lokacije privremenih akcija koje organizira Hrvatski Crveni Križ

U prvu kategoriju spadaju KBC Osijek, KBC Rijeka, KBC
Split, OB Dubrovnik, OB Varaždin, OB Zadar i Hrvatskom zavodu za transfuzijsku medicinu Zagreb. 

Korisnici koji će koristiti našu aplikaciju dijele se u dvije kategorije: nerigistrirani korisnik (gost), te registrirani korisnik. Nadalje, korisnik može registrirati dvije vrste računa: Donor krvi i Zaposlenik Hrvatskog Crvenog Križa (administrator, admin). Potreba za ove modele korištenja aplikacije proizlaze iz toga da dio aplikacije treba biti vidljiv i još neprijavljenim korisnicima, i toga da prosječan donor krvi te zaposlenik Hrvatskog Crvenog Križa koriste aplikaciju na znatno različite načine.
- **gost** - način korištenja aplikacije kada korisnik nije prijavljen u sustav. U ovom modu moguće je prijaviti se ili registrirati novi korisnički račun. Osim toga, moguć je pregled svih lokacija vađenja krvi, i onih stalnih i trenutno aktivnih povremenih akcija, ali bez mogućnosti naručivanja termina. Također, gostu je dostupna stranica sa osnovnim informacijama o aplikaciji i Hrvatskom Crvenom Križu.
- **Donor Krvi** - kad se gost prijavi u sustav, jedna od mogućih opcija je napraviti račun za donora krvi. U ovom modu korištenja aplikacije korisnik može napraviti sve što i gost, sa još dodatnim funkcionalnostima. Kod pregleda lokacija, prikazuje mu se gumb koji ga vodi na odabit termina i rezervaciju istog. Dostupna mu je i mogućnost pregleda vlastitog profila s brojnim informacijama koje će mo u detalje navesti kasnije. Također, kad admin pošalje obavijest za hitnom akcijom, korisnik dobiva poruku na mail. Kad stitne na link u mailu, ili pristupi aplikaciji nakon poziva preusmjerit će se na stranicu na kojoj ima mogućnost rezervirati termin za hitnu akciju.
- **admin** - dalje u tekstu nazvan i Hrvatski Crveni Križ ili samo Crveni Križ. Također ima sve opcije iste kao i gost s još nekim dodatnim mogućnostima. Admin verificira korisnika koji se registrira, nakon čega se korisnik može prijaviti u sustav. Također, dodaje, mijenja i arhivira akcije darivanja krvi. Može napraviti zapis svaki put kad netko da krv u svrhu pračenja povijesti darivanja krvi svakog korisnika. Može vidjeti koliko ljudi je rezerviralo termin za neku akciju.

Naša web aplikacija zamišljena je kao skupina raznih stranica koje će nam pomoći kod organizacije svih funkcija koje aplikacija treba imati. Registracija korisnika od gosta traži sljedeće informacije:
- Ime i pretime
- Spol
- Adresa
- Primarna zdravstvena ustanova
- Email adresa 
- Datum rođenja
- Broj zdravstvene kartice
- Krvna grupa

Jednom kad se osoba odluči registrirati, svi upisani podaci šalju se adminu na verifikaciju. Nakon što admin pregleda podatke i zaključi da izgledaju ispravno, potvrđuje potvrdu korisnika i njegov račun postaje aktivan. Korisnik dobiva mail da ima mogućnost prijaviti se u aplikaciju. 

Kad se korisnik prijavi, prvo što vidi na stranici je prikaz svojeg profila. Na njemu su mu vidljive sve njegovne osobne informacije, neke od kojih može i editirati. Vidljive su mu sve aktivne rezervacije koje onda može otkazati ako je potrebno. Sljedeće što je vidljivo prijavljenom korisniku jest povijest svih termina kad je korisnik dao krv i bio upisan u aplikaciju od admina. I na kraju, vidljiva mu je lista svih potvrda koje može "osvojiti" ako dovoljan broj puta da krv. 

Micanjem kroz meni koji se uvijak nalazi na svakoj stranici aplikacije, korisnik se može prebaciti na stranicu za pregledavanje lokacija na kojima ima mogućnost prijaviti termin za davanje krvi. Sve lokacije na stranici su također vidljive na karti. Kad korisnik izabere lokaciju, preusmjeren je na biranje termina i gumbom potvrđuje registraciju. 

Tijekom registracije, gost može izabrati mogućnost registrirati se kao zaposlenik Hrvatskog Crvenog Križa. Nakon što je verificiran, prijavom u sustav ovaj korsinik postaje admin. Može verificirati ostale goste koji se žele registrirati. Može stvoriti novu akciju unoseći lokaciju, termine i trajanje akcije. Ako je nešto slućajno krivo unio, ima mogućnost urediti akciju. 

Akcije koje admin stvara imaju dva stanja:
- aktivne - akcija je stvorena i još nije istekla. Vidljiva je svim korisnicima i admin ju može uređivati ako je potrebno.
- arhivirane - akcija je "istekla" te više nije vidljiva korisnicima. Admin ju više nemože uređivati, ali ju može pregledavati.
Sve akcije počnu kao aktivne. Kad prođe zadnji dan akcije, ona se automatski arhivira. Ako kojim skučajem admin treba zatvoriti akciju prije dana isteka, ponuđena mu je mogućnost to napraviti.

Admin također u slučaju nestanka zaliha neke krvne grupe može poslati korisnicima obavijest za hitnu akciju darivanja krvi. Upisom krvne grupe i lokacije u odgovarajuće prozore prvo šalje svim korisnicima u krugu od 20km poruku na mail, te modal obavijest u aplikaciju. Korisnici dobivaju mogućnost potvrditi svoj dolazak i organizirati termin za navedenu hitnu akciju. Ako se dovoljno ljudi ne prijavi u određenom vremenskom roku, aplikacija će poslati poruku svim ostalim korisnicima u regiji.

Moguće nadogradnje koje bi daljnje poboljšale ovaj sustav su pregled statistike za zaposlenike Hrvatskog Crvenog Križa. To uključuje izradu posebne stranice gdje bi administratorima bilo prikazano koliko ljudi se prijavilo za termin za koju akciju i u kojim terminima, koji su omjeri krvnih grupi prijavljenih ljudi, koliko ljudi se odazvalo na neku hitnu akciju, koliko krvi je sveukupno sakupljeno kroz različite vremenske periode i slično.