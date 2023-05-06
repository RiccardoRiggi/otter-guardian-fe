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

![Inserimento indirizzo email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageUno.png)

In alternativa è possibile inserire il proprio indirizzo email e scegliere una delle seguenti modalità:

![Lista modalità di autenticazione](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageDue.png)

### Password più codice di backup

![Password più codice di backup](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageCinque.png)

Dalla pagina delle impostazioni utente è possibile generare dei codici di backup monouso che possono essere utilizzati se non si ha a portata di mano il secondo dispositivo o la casella di posta. 

### Password più codice di verifica sull'authenticator

![Password più codice di verifica sull'authenticator](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageCinque.png)

Dopo aver inserito correttamente la password, accedendo all'authenticator verrà mostrato un codice di verifica di 6 cifre da inserire per proseguire

---

### Password più codice di verifica via email

![Password più codice di verifica via email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageQuattro.png)

Dopo aver inserito correttamente la password, verrà inviata un'email con il codice di verifica di 6 cifre da inserire per proseguire

---

### Password più click per autorizzare

![Password più click per autorizzare](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageTre.png)

Dopo aver inserito correttamente la password, dovrai aprire l'authenticator e autorizzare l'accesso

---

### Codice di verifica sull'authenticator

![Codice di verifica sull'authenticator](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageCinque.png)

Dovrai aprire l'authenticator e inserire il codice che verrà mostrato.

---

### Click per autorizzare

![Click per autorizzare](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/loginPageTre.png)

Dovrai aprire l'authenticator e autorizzare l'accesso

---

Ogni autenticazione andata a buon fine invaliderà tutte le sessioni precedentemente create.

---

## Recupero Password

![Inserimento indirizzo email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordUno.png)

Per recuperare la password bisogna inserire il proprio indirizzo email e scegliere una delle seguenti modalità:

![Lista modalità di recupero password](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordDue.png)

### Codice di verifica sull'authenticator

![Codice di verifica sull'authenticator](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordTre.png)

Dovrai aprire l'authenticator e inserire il codice che verrà mostrato insieme alla nuova password.

### Codice di verifica via email

![Codice di verifica via email](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/recuperoPasswordTre.png)

Dovrai inserire la nuova password insieme al codice che ti verrà inviato via email

---

## Impostazioni utente

![Pagina impostazioni Utente parte 1](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/impostazioniUtenteUno.png)

![Pagina impostazioni Utente parte 2](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/impostazioniUtenteDue.png)

Dalla pagina delle impostazioni è possibile eseguire le seguenti operazioni:

* Abilitare o disabilitare specifici metodi di autenticazione
* Abilitare o disabilitare specifici metodi di recupero password
* Generare i codici di backup
* Aggiungere un nuovo dispositivo fisico
* Visualizzare lo storico dei dispositivi associati
* Visualizzare lo storico degli accessi effettuati

--- 

## Gestione utenti

![Lista utenti](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaUtenti.png)

Dalla lista utenti è possibile aggiungere un nuovo utente, modificarlo, bloccarlo temporaneamente oppure eliminarlo

![Aggiungi utente](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/inserisciUtente.png)

Per creare un nuovo utente è necessario inserire nome, cognome, email e password. 

--- 

## Gestione ruoli

![Lista ruoli](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaRuoli.png)

Dalla lista ruoli è possibile inserire un nuovo ruolo, modificarne uno esistente oppure eliminarlo. I ruoli AMM e USER sono ruoli di default presenti nel sistema.

![Aggiungi ruolo](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/inserisciRuolo.png)

Per aggiungere un ruolo è necessario inserire un codice identificativo e una descrizione

---

## Gestione risorse

![Lista risorse](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaRisorse.png)

Le risorse sono i singoli metodi (servizi REST) invocati (vedi la questione del nomeMetodo nella documentazione del backend). Dalla lista risorse è possibile creare una nuova risorsa, modificare oppure eliminare una risorsa esistente.

![Aggiungi risorsa](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/inserisciRisorsa.png)

Per aggiungere una nuova risorsa (oltre alla scrittura del codice sorgente sul backend) è necessario scegliere un identificativo, indicare il nome del metodo scelto e una descrizione.

![Modifica ruolo uno](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/modificaRuoloUno.png)

![Modifica ruolo due](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/modificaRuoloDue.png)

![Modifica ruolo tre](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/modificaRuoloTre.png)

Dalla pagina di modifica ruolo è possibile:

* Abilitare o disabilitare gli utenti al ruolo
* Abilitare o disabilitare le risorse al ruolo
* Abilitare o disabilitare le voci di menu al ruolo

---

## Gestione voci di menu

![Lista voci di menu](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaVociMenu.png)

Dalla lista delle voci di menu è possibile inserire una nuova voce oppure modificare o eliminare una voce esistente.

![Aggiungi voce di menu](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/inserisciVoceMenu.png)

Per inserire una nuova voce di menu bisogna specificare l'eventuale voce padre, scegliere una descrizione, un path, un'icona (vedi documentazione Font Awesome) e un numero d'ordine.

---

## Gestione notifiche

![Gestione notifiche](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/gestioneNotifiche.png)

Dalla pagina di gestione notifiche è possibile inserire una nuova notifica, gestire gli invii, modificarla oppure eliminarla.

![Inserisci notifica](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/aggiungiNotifica.png)

Per inserire una notifica è necessario scegliere il titolo e il testo.

![Invia notifica](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/inviaNotifica.png)

Dalla pagina di dettaglio della notifica è possibile modificare il titolo e il testo, decidere la modalità di invio (tutti, dato un ruolo specifico oppure singolo utente), vedere lo stato della notifica e se è stata letta.

--- 

## Gestione dispositivi fisici 

![Gestione dispositivi fisici](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaDispositiviFisici.png)

Dalla lista dei dispositivi fisici è possibile vedere tutti i dispositivi fisici abilitati agli utenti ed è possibile eliminare quelli non più utilizzati. 

---

## Gestione indirizzi ip

![Gestione indirizzi ip](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaIndirizziIp.png)

Dalla pagina di gestione degli indirizzi ip è possibile bloccare determinati indirizzi e visualizzare il numero di alert sospetti (password inserite errate, tentativi di accessi non autorizzati etc...) ed eventualmente azzerarli. 

---

## Gestione accessi

![Gestione accessi](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/listaAccessi.png)

Dalla gestione accessi è possibile vedere gli utenti attualmente connessi, lo storico e troncare eventuali sessioni in corso.

---

## Logs

![Logs](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/visualizzaLog.png)

Esiste una gestione dei logs suddivisa per livello di criticità che mostra alcune informazioni utili alla diagnostica. Abilitando la modalità tail la tavola si aggiornerà automaticamente con i nuovi record.

---

## Bom / Diba

* [React](https://react.dev/)
* [React Redux](https://react-redux.js.org/)
* [React Qr Code](https://github.com/rosskhanas/react-qr-code)
* [Argon Dashboard 2](https://www.creative-tim.com/product/argon-dashboard)
* [Bootstrap](https://getbootstrap.com/) 
* [FontAwesome](https://fontawesome.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Favicon](https://www.iconfinder.com/icons/8665786/otter_animal_icon)

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT](https://github.com/RiccardoRiggi/otter-guardian-fe/blob/main/LICENSE). Framework, temi e librerie di terze parti mantengono le loro relative licenze. 



