# Otter Guardian

Otter Guardian è una Web Application Boilerplate realizzata in React e PHP che offre diverse funzionalità come la gestione di autenticazioni, autorizzazioni, profilazioni e notifiche. Nel repository del [backend](https://github.com/RiccardoRiggi/php-rest-authenticator) puoi trovare la documentazione per invocare i servizi e la struttura del database. Nel repository [Otter Guardian Authenticator](https://github.com/RiccardoRiggi/otter-guardian-authenticator) puoi trovare la seconda applicazione React necessaria per eseguire l'autenticazione a due fattori. 


![Home](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/homepage.png)

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

![Login tramite la scansione di un QrCode](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageSei.png)

L'utente tramite la Web Application Authenticator precedentemente configurata scansionerà il codice generato a schermo e autorizzerà l'accesso. Verrà in automatico eseguito il redirect alla homepage con l'utente loggato.

---

![Inserimento indirizzo email]()

In alternativa è possibile inserire il proprio indirizzo email e scegliere una delle seguenti modalità:

![Lista modalità di autenticazione]()

### Password più codice di backup

![Password più codice di backup]()

---

Ogni autenticazione andata a buon fine invaliderà tutte le sessioni precedentemente create.

---

## Recupero Password

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



