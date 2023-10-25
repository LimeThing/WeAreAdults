# WeAreAdults
Projekt predmeta Programsko Inzinjerstvo

# Kopiran git tutorial s drugog repozitorija

Mozete skineti kopiju repozitorija sa
```git clone https://github.com/LimeThing/WeAreAdults.git```
samo pazite da vam je cmd/terminal u folderu u kojem zelite skinut repozitorij

commit messages se uvijek pisu kao da nastavljaju recenicu 'If you download this commit, it will:'
to je samo neki git obicaj
Takoder, pisemo sve komentare i poruke na hrvatski

```
git status     -> pregled statusa (promjenjene datoteke, trenutni branch itd)
git status -s   -> pregled samo promjenjenih datoteka ( -s znaci short)

git log --decorate --graph   -> za pregledavanje svih prijasnjih commitova selectanom branchu

git checkout imeBrancha     -> prebaci se na granu imeBrancha

git checkout -b noviBranch    -> stvori novu granu i odmah se prebaci na nju

git add filename    -> za dodavanje datoteke filename na listu spremnih za commitanje (ide ili ime datoteke ili put do datoteke ako je u nekom folderu)

git add .     -> za dodavanje svih datoteka na kojima su napravljene promjene u 'datoteke spremne za commit' (staged files)

git restore --staged fileName   -> makni file iz liste spremnih za commit (staged files)

git commit -m "Custom message"   -> commitanje promjena (lokalno)

git push -u origin imeBrancha       -> pushaj granu na remote repozitorij, to je ovaj koji nam git hosta. ime grane na lokalnom repozitoriju mora bit isti kao i na remote (ako nije, onda ce se kod ove komande samo stvoriti ta grana na remote repozitoriju)

git diff   -> razlike izmedu onog sto imam i onog sto je spremno za commit

git diff --staged ili --cached   -> razlika izmedu onog sto sam spremila za commit i onog sto je na serveru

git merge imeBrancha    -> mergaj selectanu granu na imeBrancha (preferiramo rebase)

git rebase imeBrancha    -> stavi selectanu granu na imeBrancha (kao da je commit poslje njega)

git pull     -> skini promjene s remote repozitorija na svoje lokalno racunalo

git pull --rebase  -> skini promjene te ih odmah spoji sa datotekama na lokalnom racunalu

git reset --hard main^   -> vrati selectani branch (ex main) za jedan commit unatrag

git commit --amend    -> za ispraljanje sitnih greskica/typos u commit message, moras napravit prije pushanja

git push --force-with-lease origin imeBranch   -> ako je tvoja promjena novija pushaj imeBrancha   da prebrise origin/branch

git checkout imeFilea     -> izbrisi sve promjene koje nisu commitane iz tog filea

git stash     -> spremanje na stash, to je kao neki privremeni spremnik za necommitane promjene na koje ces se brzo natrag vratit

git stash pop    -> vrati promjene iz stasha na trenutni kod, jako pazit moras da si na istoj grani na kojoj si napravio git stash jer ce ti inace sve za***at

git branch list   ->   pregled svih grana koje postoje na tvom lokalnom racunalu
```

To su sve komande koje ce nam ikad trebat. Preporucam da isprobate checkout, branch, add, push, commit, pull, merge i rebase
Napravite puno grana, igrajte se s njima
sa git log mozete vidjet sve commitove unatrag, sve do prvog

# Errori

Ako dobijate ovaj error u terminalu
```
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/LimeThing/gitplayground.git/'
```
sljedite upute na ovoj stranici: https://stackoverflow.com/questions/68775869/message-support-for-password-authentication-was-removed
umjesto git password samo kopirajte izgenerirani token 
