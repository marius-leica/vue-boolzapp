dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_relativeTime);

const contatti = [
  {
    name: "Michele",
    avatar: "_1",
    visible: true,
    isActive: false,

    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Hai portato a spasso il cane?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Ricordati di stendere i panni",
        status: "sent",
      },
      {
        date: "10/01/2020 16:15:22",
        message: "Tutto fatto!",
        status: "received",
      },
    ],
  },
  {
    name: "Fabio",
    avatar: "_2",
    visible: true,
    isActive: false,

    messages: [
      {
        date: "20/03/2020 16:30:00",
        message: "Ciao come stai?",
        status: "sent",
      },
      {
        date: "20/03/2020 16:30:55",
        message: "Bene grazie! Stasera ci vediamo?",
        status: "received",
      },
      {
        date: "20/03/2020 16:35:00",
        message: "Mi piacerebbe ma devo andare a fare la spesa.",
        status: "sent",
      },
    ],
  },
  {
    name: "Samuele",
    avatar: "_3",
    visible: true,
    messages: [
      {
        date: "28/03/2020 10:10:40",
        message: "La Marianna va in campagna",
        status: "received",
      },
      {
        date: "28/03/2020 10:20:10",
        message: "Sicuro di non aver sbagliato chat?",
        status: "sent",
      },
      {
        date: "28/03/2020 16:15:22",
        message: "Ah scusa!",
        status: "received",
      },
    ],
  },
  {
    name: "Alessandro B.",
    avatar: "_4",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Lo sai che ha aperto una nuova pizzeria?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Si, ma preferirei andare al cinema",
        status: "received",
      },
    ],
  },
  {
    name: "Alessandro L.",
    avatar: "_5",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ricordati di chiamare la nonna",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Va bene, stasera la sento",
        status: "received",
      },
    ],
  },
  {
    name: "Claudia",
    avatar: "_6",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ciao Claudia, hai novit???",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Non ancora",
        status: "received",
      },
      {
        date: "10/01/2020 15:51:00",
        message: "Nessuna nuova, buona nuova",
        status: "sent",
      },
    ],
  },
  {
    name: "Federico",
    avatar: "_7",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Fai gli auguri a Martina che ?? il suo compleanno!",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Grazie per avermelo ricordato, le scrivo subito!",
        status: "received",
      },
    ],
  },
  {
    name: "Davide",
    avatar: "_8",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ciao, andiamo a mangiare la pizza stasera?",
        status: "received",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "No, l'ho gi?? mangiata ieri, ordiniamo sushi!",
        status: "sent",
      },
      {
        date: "10/01/2020 15:51:00",
        message: "OK!!",
        status: "received",
      },
    ],
  },
];

/*
# Milestone 1

Replica della grafica con la possibilit?? di avere messaggi scritti dall???utente (verdi) e dall???interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all???interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l???utente scrive un testo nella parte bassa e digitando ???enter??? il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall???interlocutore: ad ogni inserimento di un messaggio, l???utente ricever?? un ???ok??? come risposta, che apparir?? dopo 1 secondo.

Milestone 4

Ricerca utenti: scrivendo qualcosa nell???input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
???mar??? rimangono solo Marco e Martina)

Milestone 5

Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/

const app = new Vue({
  el: "#app",
  data: {
    contacts: contatti,
    currentContact: contatti[0],
    message: "",
    search: "",
  },
  methods: {
    selectContact(contact) {
      this.currentContact = contact;
    },
    addMessage(message) {
      this.currentContact.messages.push({
        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        message: message,
        status: "sent",
      });
      //ad ogni inserimento di un messaggio, l???utente ricever?? un ???ok??? come risposta, che apparir?? dopo 1 secondo
      setTimeout(() => {
        this.currentContact.messages.push({
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          message: "ok",
          status: "received",
        });
      }, 1000);
    },
    //vogliamo una fucntion che salva la data del ultimo messaggio da poterla poi stampare
    getLastMessageDate(contact) {
      if (contact.messages.length === 0) {
        return "";
      }

      let dateLast = contact.messages[contact.messages.length - 1].date;
      return this.formatDate(dateLast);
    },

    // vogliamo fare una ricerca per nome
    searchContacts(search) {
      return this.contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(search.toLowerCase());
      });
    },

    formatDate(date) {
      let dayjsDate = dayjs(date, "DD/MM/YYYY HH:mm:ss");

      return dayjsDate.format("HH:mm");
    },

    //vogliamo una fucntion che cancella il messaggio selezionato
    deleteMessage(i) {
      this.currentContact.messages.splice(i, 1);
    },
  },
});

// backtick = `
console.log(dayjs());
