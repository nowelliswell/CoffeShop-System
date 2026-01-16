# Coffee Haven ☕

Website coffee shop modern dengan sistem pemesanan online dan pembayaran terintegrasi.

## ✨ Features

### 🎨 UI/UX
- ⚡️ Fast & Optimized dengan Vite
- 🎨 Responsive Design dengan Dark Theme
- 📱 Mobile Friendly
- 🔥 Hot Module Replacement (HMR)
- 🎯 Component-based Architecture

### 🛒 Order System
- **Dine In**: Pesan langsung, bayar di tempat
- **Take Away**: Sistem pembayaran transfer dengan verifikasi
- 📋 Receipt pesanan otomatis
- 💳 Upload bukti transfer
- 📄 Generate PDF invoice & struk pembayaran
- ✅ Verifikasi pembayaran otomatis

### 📱 Components
- Navbar dengan smooth scroll
- Hero section dengan CTA buttons
- Menu showcase dengan grid layout
- Order form dengan dual payment system
- Location dengan Google Maps
- Footer dengan social media links

## 🛠 Tech Stack

- **Frontend**: React 19.2
- **Build Tool**: Vite 7.2
- **PDF Generation**: jsPDF 4.0
- **Styling**: CSS3 dengan custom properties
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/coffee-haven.git
cd coffee-haven

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
coffee-haven/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Menu.jsx         # Menu display
│   │   ├── OrderForm.jsx    # Order & payment system
│   │   ├── Location.jsx     # Location & map
│   │   └── Footer.jsx       # Footer section
│   ├── data/
│   │   └── menuData.js      # Menu items data
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💡 How It Works

### Order Flow - Dine In
1. Customer mengisi nama & nomor telepon
2. Pilih "Dine In"
3. Pilih menu & quantity
4. Submit → Download invoice
5. Bayar di kasir saat tiba

### Order Flow - Take Away
1. Customer mengisi nama & nomor telepon
2. Pilih "Take Away"
3. Pilih menu & quantity
4. Submit → Tampil receipt pesanan dengan:
   - Detail pesanan
   - Total pembayaran
   - Nomor rekening: **0677789012345 a.n. Noel**
5. Upload bukti transfer
6. Download struk pembayaran terverifikasi
7. Tunjukkan struk saat pengambilan pesanan

## 🎨 Customization

### Menu Items
Edit `src/data/menuData.js`:
```javascript
export const menuData = [
  {
    name: "Nama Menu",
    price: "Rp XX.XXX",
    img: "URL_GAMBAR",
    label: "Badge" // optional
  }
];
```

### Color Theme
Edit `src/App.css`, cari dan ganti:
- Primary color: `#c49b63` (gold)
- Dark background: `#0a0a0a`, `#1a1a1a`, `#2a2a2a`

### Payment Info
Edit `src/components/OrderForm.jsx`:
- Nomor rekening (baris ~100 & ~300)
- Nama pemilik rekening

### Contact Info
- WhatsApp: Edit `src/components/Footer.jsx`
- Location: Edit `src/components/Location.jsx`

## 📦 Deployment

### Build
```bash
npm run build
```

### Deploy Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop folder `dist`
- **GitHub Pages**: 
  ```bash
  npm run build
  git add dist -f
  git commit -m "Deploy"
  git subtree push --prefix dist origin gh-pages
  ```

## 🔧 Configuration

### Vite Config
File: `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Change for subdirectory deployment
})
```

## 📝 Environment Variables

Tidak ada environment variables yang diperlukan untuk development.

## 🐛 Known Issues

- PDF generation menggunakan jsPDF versi 4.0 (legacy)
- File upload hanya validasi client-side
- Tidak ada backend untuk menyimpan data pesanan

## 🚧 Future Improvements

- [ ] Backend integration untuk menyimpan pesanan
- [ ] Email notification untuk customer & admin
- [ ] Payment gateway integration
- [ ] Order history & tracking
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan React + Vite

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

Jika ada pertanyaan atau butuh bantuan, silakan buat issue di repository ini.

---

⭐️ Jangan lupa kasih star jika project ini membantu!
