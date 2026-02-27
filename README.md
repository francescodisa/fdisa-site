# Francesco D'Isa — Portfolio Website

Sito statico con pannello CMS integrato (Decap CMS via Netlify).

---

## Struttura delle cartelle

```
/
├── index.html          ← Homepage
├── about.html          ← About
├── artworks.html       ← Galleria opere
├── books.html          ← Libri
├── articles.html       ← Articoli
├── css/
│   └── style.css       ← Foglio di stile
├── js/
│   └── main.js         ← Navigazione, animazioni, lightbox
├── images/
│   ├── hero.jpg        ← Immagine homepage (800×1000px)
│   ├── about.jpg       ← Foto profilo About (600×800px)
│   ├── artworks/       ← Immagini opere (minimo 800×800px)
│   ├── books/          ← Copertine libri (400×550px)
│   └── uploads/        ← Immagini caricate tramite CMS
├── admin/
│   ├── index.html      ← Pannello CMS
│   └── config.yml      ← Configurazione CMS
└── netlify.toml        ← Configurazione Netlify
```

---

## Come pubblicare su Netlify (prima volta)

1. Crea un account su https://netlify.com (gratuito)
2. Vai su **"Add new site" → "Deploy manually"**
3. Trascina l'intera cartella del sito nella finestra di Netlify
4. Il sito sarà online in pochi secondi con un URL tipo `random-name.netlify.app`
5. Puoi collegare un dominio personalizzato da **Site settings → Domain management**

---

## Come attivare il CMS (dopo il primo deploy)

1. In Netlify, vai su **Site settings → Identity → Enable Identity**
2. Alla voce **Registration**, scegli **Invite only**
3. Vai su **Services → Git Gateway → Enable Git Gateway**
4. Torna su **Identity → Invite users** e invita la tua email
5. Riceverai una mail: clicca il link e imposta la password
6. Da quel momento puoi accedere al CMS all'indirizzo:
   `https://tuosito.netlify.app/admin`

---

## Come modificare i contenuti manualmente (senza CMS)

Apri i file HTML con un editor di testo (es. VS Code, Notepad++).

- **Testo about**: `about.html` → sezione `<div class="about-bio">`
- **Aggiungere un'opera**: `artworks.html` → duplica un blocco `.artwork-item`
- **Aggiungere un libro**: `books.html` → duplica un blocco `.book-item`
- **Aggiungere un articolo**: `articles.html` → duplica un blocco `.article-item`

Dopo ogni modifica, trascina di nuovo la cartella su Netlify per aggiornare il sito.

---

## Immagini: dove metterle

| Sezione  | Cartella              | Formato consigliato |
|----------|-----------------------|---------------------|
| Homepage | `/images/hero.jpg`    | JPG, 800×1000px     |
| About    | `/images/about.jpg`   | JPG, 600×800px      |
| Opere    | `/images/artworks/`   | JPG, min 800×800px  |
| Libri    | `/images/books/`      | JPG, 400×550px      |

---

## Personalizzazione grafica

Tutte le variabili di colore e tipografia si trovano all'inizio di `css/style.css`:

```css
:root {
  --bg:    #F8F6F2;   /* sfondo */
  --text:  #111110;   /* testo */
  --muted: #888580;   /* testi secondari */
  --border:#DDD9D3;   /* bordi */
}
```

I font usati sono **Cormorant Garamond** (titoli, serif elegante) e **Jost** (navigazione e body, sans-serif leggero), entrambi caricati da Google Fonts.
