# PDF Photo Pin — V1

Web app/PWA per iPad:
- importa un PDF
- visualizza le pagine
- tocca un punto della tavola
- associa una sola foto (fotocamera o libreria)
- aggiunge una nota
- salva tutto localmente in IndexedDB
- funziona offline dopo la prima apertura/installazione e dopo che le risorse PDF.js sono state memorizzate nella cache
- nessun account, server o cloud applicativo

## Come provarla
La PWA deve essere servita da HTTPS per poter essere installata correttamente su iPad.

Opzioni semplici:
1. pubblicare questi file su GitHub Pages;
2. usare un hosting statico HTTPS;
3. per test locale, usare un server locale.

Su iPad:
Safari -> apri l'indirizzo -> Condividi -> "Aggiungi alla schermata Home".

## Nota importante
La V1 è un prototipo funzionale. Il progetto è salvato nel browser del dispositivo; se Safari elimina i dati del sito, i progetti possono andare persi. La prossima iterazione dovrebbe aggiungere:
- "Apri progetto" / elenco progetti
- backup/esportazione del progetto
- esportazione PDF con pin/foto
- migliore gestione memoria immagini
- blocco/gestione del tocco durante zoom e pan
- icone e grafica definitiva
