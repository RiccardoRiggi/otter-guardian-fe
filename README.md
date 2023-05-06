# Otter Guardian

Otter Guardian è una Web Application Boilerplate realizzata in React e PHP che offre diverse funzionalità come la gestione di autenticazioni, autorizzazioni, profilazioni e notifiche. Nel repository del [backend](https://github.com/RiccardoRiggi/php-rest-authenticator) puoi trovare la documentazione per invocare i servizi e la struttura del database. Nel repository [Otter Guardian Authenticator](https://github.com/RiccardoRiggi/otter-guardian-authenticator) puoi trovare la seconda applicazione React necessaria per eseguire l'autenticazione a due fattori. 


![Home](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/homepage.png?token=GHSAT0AAAAAACAV23JCUXUECLULNEJLUMRAZCWEYEQ)

Di seguito è presente la documentazione della sola componente di frontend.    

---

## Installazione e avvio
```sh
$ npm install
$ npm start
```

## Autenticazione
Per accedere all'applicativo esistono diversi metodi di autenticazione che impiegano anche l'utilizzo di un secondo dispositivo fisico (vedi documentazione):

### Login tramite la scansione di un QrCode

![Login tramite la scansione di un QrCode](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageSei.png?token=GHSAT0AAAAAACAV23JC4JBE25VF7UMH543IZCWFHYA)

L'utente tramite la Web Application Authenticator precedentemente configurata scansionerà il codice generato a schermo e autorizzerà l'accesso. Verrà in automatico eseguito il redirect alla homepage con l'utente loggato.

---

![Inserimento indirizzo email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageUno.png?token=GHSAT0AAAAAACAV23JC6ZVYA2EMWYLOVYCYZCWEYXA)

In alternativa è possibile inserire il proprio indirizzo email e scegliere una delle seguenti modalità:

![Lista modalità di autenticazione](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageDue.png?token=GHSAT0AAAAAACAV23JCGVILMQWCCWGVIESAZCWEZFA)

### Password più codice di backup

![Password più codice di backup](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageCinque.png?token=GHSAT0AAAAAACAV23JCWWCW3YNDCK53UKZ4ZCWFG2A)

Dalla pagina delle impostazioni utente è possibile generare dei codici di backup monouso che possono essere utilizzati se non si ha a portata di mano il secondo dispositivo o la casella di posta. 

### Password più codice di verifica sull'authenticator

![Password più codice di verifica sull'authenticator](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageCinque.png?token=GHSAT0AAAAAACAV23JCWWCW3YNDCK53UKZ4ZCWFG2A)

Dopo aver inserito correttamente la password, accedendo all'authenticator verrà mostrato un codice di verifica di 6 cifre da inserire per proseguire

---

### Password più codice di verifica via email

![Password più codice di verifica via email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageQuattro.png?token=GHSAT0AAAAAACAV23JDMDGOT2FSAI6BGHL4ZCWFF7A)

Dopo aver inserito correttamente la password, verrà inviata un'email con il codice di verifica di 6 cifre da inserire per proseguire

---

### Password più click per autorizzare

![Password più click per autorizzare](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageTre.png?token=GHSAT0AAAAAACAV23JCBPWFXNSAMDRBE2Z6ZCWFFMA)

Dopo aver inserito correttamente la password, dovrai aprire l'authenticator e autorizzare l'accesso

---

### Codice di verifica sull'authenticator

![Codice di verifica sull'authenticator](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageCinque.png?token=GHSAT0AAAAAACAV23JCWWCW3YNDCK53UKZ4ZCWFG2A)

Dovrai aprire l'authenticator e inserire il codice che verrà mostrato.

---

### Click per autorizzare

![Click per autorizzare](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageTre.png?token=GHSAT0AAAAAACAV23JCBPWFXNSAMDRBE2Z6ZCWFFMA)

Dovrai aprire l'authenticator e autorizzare l'accesso

---

Ogni autenticazione andata a buon fine invaliderà tutte le sessioni precedentemente create.

---

## Recupero Password

![Inserimento indirizzo email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordUno.png?token=GHSAT0AAAAAACAV23JCWSZXLSRSK7GK6KYWZCWFJIA)

Per recuperare la password bisogna inserire il proprio indirizzo email e scegliere una delle seguenti modalità:

![Lista modalità di recupero password](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordDue.png?token=GHSAT0AAAAAACAV23JDYNNVS55AJCHXRPREZCWFJ3Q)

### Codice di verifica sull'authenticator

![Codice di verifica sull'authenticator](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordTre.png?token=GHSAT0AAAAAACAV23JD54NKIA5EJVGVPFEAZCWFMQA)

Dovrai aprire l'authenticator e inserire il codice che verrà mostrato insieme alla nuova password.

### Codice di verifica via email

![Codice di verifica via email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordTre.png?token=GHSAT0AAAAAACAV23JD54NKIA5EJVGVPFEAZCWFMQA)

Dovrai inserire la nuova password insieme al codice che ti verrà inviato via email

---

## Impostazioni utente

## Gestione utenti

## Gestione ruoli

## Gestione risorse

## Gestione voci di menu

## Gestione notifiche

## Gestione dispositivi fisici 

## Gestione indirizzi ip

## Gestione accessi

## Logs


## Bom / Diba

* [React](https://react.dev/)
* [Argon Dashboard 2](https://www.creative-tim.com/product/argon-dashboard)
* [Bootstrap](https://getbootstrap.com/) 
* [FontAwesome](https://fontawesome.com/)
* [Favicon](https://www.iconfinder.com/icons/8665786/otter_animal_icon)

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT](https://github.com/RiccardoRiggi/otter-guardian-fe/blob/main/LICENSE). Framework, temi e librerie di terze parti mantengono le loro relative licenze. 



