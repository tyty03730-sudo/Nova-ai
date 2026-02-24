# 🤖 NOVA AI — Siap Deploy ke Netlify

## Cara Deploy

### 1. Install Dependencies
```bash
npm install
```

### 2. Test di Local (Opsional)
```bash
npm run dev
```

### 3. Build Project
```bash
npm run build
```

### 4. Deploy ke Netlify

**Cara A — Drag & Drop:**
1. Buka https://netlify.com dan login
2. Klik "Add new site" → "Deploy manually"
3. Drag folder `dist` ke halaman tersebut
4. Done! Kamu dapat link website gratis

**Cara B — Via GitHub (Auto-deploy):**
1. Push project ini ke GitHub
2. Di Netlify: "Add new site" → "Import from Git"
3. Pilih repo → Netlify auto-detect settings dari netlify.toml
4. Done!

### 5. Set API Key (WAJIB!)
1. Pergi ke https://console.anthropic.com → API Keys → Buat key baru
2. Di Netlify Dashboard → Site Settings → Environment Variables
3. Tambah variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-xxxxxx` (API key kamu)
4. Redeploy site

## Struktur Project
```
nova-ai/
├── src/
│   ├── main.jsx          # Entry point React
│   └── App.jsx           # Komponen chat utama
├── netlify/
│   └── functions/
│       └── chat.js       # Backend proxy API (menyembunyikan API key)
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml          # Konfigurasi Netlify
└── README.md
```

## Teknologi
- React 18 + Vite
- Netlify Functions (serverless backend)
- Claude AI (Anthropic)
