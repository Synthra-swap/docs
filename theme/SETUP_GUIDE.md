# Come Usare il Tema Synthra per GitBook-CLI

Questa guida ti spiega come installare e utilizzare il tema personalizzato Synthra per GitBook-CLI.

## Prerequisiti

1. **Node.js** (versione 14 o superiore)
2. **GitBook-CLI** installato globalmente

```bash
npm install -g gitbook-cli
```

## Installazione del Tema

### Metodo 1: Copia Diretta (Raccomandato)

1. Copia la cartella `synthra-theme` nella directory del tuo progetto:
```bash
cp -r theme/synthra-theme /path/to/your/gitbook/project/
```

2. Crea o aggiorna il file `book.json` nella root del tuo progetto GitBook:
```json
{
  "title": "Il Tuo Titolo",
  "description": "La tua descrizione",
  "theme": "./synthra-theme",
  "styles": {
    "website": "synthra-theme/styles/website.css"
  },
  "plugins": [
    "theme-default",
    "search-pro",
    "prism",
    "anchors"
  ]
}
```

### Metodo 2: Installazione come Pacchetto NPM

1. Crea un pacchetto npm dal tema:
```bash
cd theme/synthra-theme
npm pack
```

2. Installa il pacchetto nel tuo progetto GitBook:
```bash
npm install ./synthra-theme-1.0.0.tgz
```

3. Configura `book.json`:
```json
{
  "theme": "synthra-theme"
}
```

## Configurazione

### File book.json Completo

```json
{
  "title": "Synthra Protocol Documentation",
  "description": "Complete documentation for Synthra Protocol",
  "author": "Synthra Protocol Team",
  "language": "en",
  
  "theme": "./synthra-theme",
  
  "styles": {
    "website": "synthra-theme/styles/website.css"
  },
  
  "plugins": [
    "theme-default",
    "search-pro",
    "prism",
    "anchors",
    "edit-link",
    "github"
  ],
  
  "pluginsConfig": {
    "search-pro": {
      "maxSearchs": 8
    },
    "prism": {
      "css": ["prism-themes/themes/prism-one-dark.css"]
    },
    "edit-link": {
      "base": "https://github.com/your-org/docs/edit/main",
      "label": "Edit This Page"
    },
    "github": {
      "url": "https://github.com/your-org/docs"
    }
  },
  
  "variables": {
    "title": "Your Documentation",
    "url": "https://docs.yoursite.com",
    "social": {
      "twitter": "@your_handle",
      "discord": "https://discord.gg/your-invite",
      "github": "https://github.com/your-org"
    }
  }
}
```

## Struttura della Documentazione

Crea la struttura base:

```
your-gitbook/
├── book.json
├── README.md
├── SUMMARY.md
├── synthra-theme/
│   ├── package.json
│   ├── index.js
│   ├── styles/
│   │   └── website.css
│   ├── scripts/
│   │   └── theme.js
│   └── _layouts/
│       └── website/
│           └── page.html
└── docs/
    ├── getting-started.md
    ├── features/
    └── developers/
```

### File SUMMARY.md di Esempio

```markdown
# Summary

## Introduction
* [Overview](README.md)
* [Getting Started](getting-started.md)

## Core Features
* [Overview](features/README.md)
* [Treasury Mechanism](features/treasury.md)
* [Tokenomics](features/tokenomics.md)

## Developer Guide
* [Overview](developers/README.md)
* [SDK](developers/sdk.md)
* [API Reference](developers/api.md)
```

## Comandi GitBook

### Sviluppo Locale

```bash
# Installa i plugin
gitbook install

# Avvia il server di sviluppo
gitbook serve

# Il sito sarà disponibile su http://localhost:4000
```

### Build per Produzione

```bash
# Build della documentazione
gitbook build

# I file saranno generati nella cartella _book/
```

### Pulizia Cache

Se hai problemi, pulisci la cache:
```bash
gitbook clean
```

## Personalizzazione del Tema

### Modifica dei Colori

Edita `synthra-theme/styles/website.css` e cambia le variabili CSS:

```css
:root {
  /* Cambia i colori principali */
  --synthra-primary: #your-primary-color;
  --synthra-secondary: #your-secondary-color;
  
  /* Cambia i gradienti */
  --synthra-gradient-primary: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Aggiungere JavaScript Personalizzato

Modifica `synthra-theme/scripts/theme.js` per aggiungere funzionalità:

```javascript
// Aggiungi il tuo codice personalizzato
function customFunction() {
  // La tua logica
}

// Chiama la funzione quando il DOM è pronto
ready(customFunction);
```

### Modificare il Layout

Edita `synthra-theme/_layouts/website/page.html` per cambiare la struttura HTML.

## Plugin Raccomandati

Installa plugin aggiuntivi per migliorare la funzionalità:

```bash
# Plugin per la ricerca avanzata
npm install gitbook-plugin-search-pro

# Plugin per syntax highlighting
npm install gitbook-plugin-prism

# Plugin per ancore nei titoli
npm install gitbook-plugin-anchors

# Plugin per link di modifica
npm install gitbook-plugin-edit-link

# Plugin per integrazione GitHub
npm install gitbook-plugin-github
```

## Deployment

### GitHub Pages

1. Crea un workflow GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: Deploy GitBook

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install GitBook CLI
      run: npm install -g gitbook-cli
    
    - name: Install plugins
      run: gitbook install
    
    - name: Build book
      run: gitbook build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_book
```

### Netlify

1. Connetti il tuo repository a Netlify
2. Configura il build:
   - Build command: `gitbook build`
   - Publish directory: `_book`

### Vercel

1. Connetti il repository a Vercel
2. Configura:
   - Framework Preset: Other
   - Build Command: `gitbook build`
   - Output Directory: `_book`

## Troubleshooting

### Errori Comuni

1. **Plugin non trovato**: Esegui `gitbook install`
2. **Tema non caricato**: Verifica il percorso in `book.json`
3. **CSS non applicato**: Controlla il percorso del file CSS
4. **JavaScript non funzionante**: Verifica la console del browser per errori

### Debug

Abilita il debug mode:
```bash
DEBUG=* gitbook serve
```

### Reset Completo

Se hai problemi persistenti:
```bash
# Rimuovi i moduli
rm -rf node_modules

# Pulisci GitBook
gitbook clean

# Reinstalla tutto
gitbook install
```

## Esempi di Utilizzo

### Callout Personalizzati

```markdown
> **💡 Tip:** Questo è un suggerimento utile

> **⚠️ Warning:** Fai attenzione a questo aspetto

> **📝 Note:** Informazione importante da ricordare
```

### Code Blocks con Linguaggio

````markdown
```javascript
// Esempio di codice JavaScript
function example() {
  return "Hello Synthra!";
}
```

```solidity
// Esempio di Smart Contract
pragma solidity ^0.8.0;

contract Example {
  string public message = "Hello Synthra!";
}
```
````

### Tabelle Responsive

```markdown
| Feature | Synthra | Competitor A | Competitor B |
|---------|---------|--------------|--------------|
| Fees | 0.3% + 0.1% treasury | 0.3% | 0.25% |
| TVL | $100M+ | $50M | $75M |
| Chains | 3 | 1 | 2 |
```

## Supporto

Per supporto tecnico:
- GitHub Issues: [Repository del tema](https://github.com/Synthra-swap/docs)
- Discord: [Server della community](https://discord.gg/eesEKPRDtd)
- Documentazione GitBook: [GitBook Docs](https://docs.gitbook.com)

---

Il tema Synthra offre un'esperienza moderna e professionale per la tua documentazione, con design responsive, dark mode, e tutte le funzionalità necessarie per una documentazione di protocollo DeFi di alta qualità.
