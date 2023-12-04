# Kako se koristit gitom

Prije nego što napravite ikakvu primjenu, ili ako ste već napravili neke ali ih niste commitali, provjerite gdje se nalazite sa

```git status```

ako niste na grani na kojoj trebate biti (dev ili devdoc), prebacite se an nju sa

```git checkout devdoc```

Postoji slučaj da se je na remote repozitoriju u međuvremenu (od kad ste zadnji put pullali devdoc) grana devdoc promjenila jer je netrko spojio svoju granu s njom. Da povučete sve nove promjene, privjerite dal ste pozicionirani na grani devdoc sa komandom git status, te izvrtite:

```git pull```

Sad vaša grana ima sve iste promjene kao i grana na remote repozitoriju.

Iz ove grane radite grane za svoje nove značajke, feature ili bilo kakve promjene. Ime grana netrebaju biti duga, ali bi iz njih se trebalo moći očitati o čemu je riječ u vašoj grani. Idemo pretpostaviti da želim napravit granu Iva-UML-dijagram

```git checkout -b Iva-UML-dijagram```

U ovoj komandi, -b označuje izradu nove grane.
Sada ako ponovo pokrenete komandu git status, bit će Vam vidljivo da se nalazite na vašoj grani. Sad možete raditi napraviti još neke promjene u datotekama, kopirati datoteke unutar repozitorija, stvarati nove datoteke ili što god već treba napraviti. Kad ste završili sa poslom, trebate pripremiti promjene na commit sa:

```git add .```

Gdje . označava da spremate sve promjene koje već nisu spremljene. I sad ih commitamo kako bi ih spremili na lokalni repozitorij.

```git commit -m "Opis promjene koji nije pre dug"```

Ako će trebati duže raspisati opis, moći ćete to kasnije napraviti u Pull Requestu. Možete naoraviti koliko god commitova želite na nekoj grani. Kada sve commitate i završite c![](https://i.imgur.com/fle4Lkl.png)ijelokupni posao koji ste htjeli napraviti na svojoj grani, vrijeme je da pushate granu na remote repozitorij.

```git push -u origin Iva-UML-dijagram```

Nakon što izvrtite ovu komandu, odlaskom na github stranicu repozitorija pojavit će vam se popup koji izgleda ovako:

![](https://i.imgur.com/fle4Lkl.png)

Nakon što pritisnete *Compare & pull request* prikaže se ovakava stranica:

![](https://i.imgur.com/3WT4XJJ.png)

Ono na što trebate najviše obratitit poyornost je ovaj dio ispod naslova, na koji *base* branch želite mergat svoj. defaultno je uvijek postavljen master, trebate ga promjeniti na dev ili devdoc, ovisno dal radite kod ili dokumentaciju. 

Na reviewers mozete postaviti mene ili bilo koga koga zelite da bude obavijesten dok napravite pull request. na Assagnees stavite sebe (klik na gumb *assign yourself*). Možete još urediti i naziv featura, i dodati dulji opis ako je potrebno. 
Nakon toga pritisnete gumb *Create pull request* i završili ste!

Ukratko, trebaju vam sljedeće komande za svaki novi feature:

```
git checkout devdoc
git pull
git checkout -b nova-grana
/* Radim promjene */
git add .
git commit -m "Kratak opis promjena"
git push -u origin nova-grana 
/* Stvaram pull request */
```