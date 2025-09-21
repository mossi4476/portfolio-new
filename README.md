# 🚀 Portfolio - Nguyen Tien Dung

<div align="center">
  <img alt="Portfolio Demo" src="./Images/readme-img1.png" />
</div>

<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) &nbsp;
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)

</div>

## ✨ World-Class Features

### 🎨 **Advanced UI/UX**
- **Glassmorphism Design** với backdrop blur effects
- **Dark/Light Theme** với smooth transitions  
- **Advanced Animations** sử dụng Framer Motion
- **Custom Cursor** với trailing effects (desktop only)
- **Floating Action Buttons** với quick actions
- **Scroll Progress Indicators** với section navigation

### 🎭 **Interactive Elements**
- **Advanced Particle System** với 6 variants khác nhau
- **Morphing Loading Screen** với multi-stage animations
- **Parallax Effects** và scroll-based animations
- **Micro-interactions** trên tất cả elements
- **Toast Notifications** với glassmorphism design

### 📱 **Modern Features**
- **Contact Form** với validation và EmailJS integration
- **Dynamic Blog System** với search và filtering
- **SEO Optimization** với meta tags và structured data
- **Analytics Tracking** với custom events
- **Performance Optimization** với lazy loading

### 🎯 **User Experience**
- **Mobile-first Design** responsive hoàn hảo
- **Accessibility Compliant** với ARIA labels
- **Performance Optimized** cho mọi thiết bị
- **Cross-browser Compatible** với modern browsers

## 🛠️ Technology Stack

### Frontend
- **React 17** với Hooks và Context API
- **Framer Motion** cho advanced animations
- **React Bootstrap** cho responsive design
- **React Router** cho navigation
- **React Helmet** cho SEO

### UI/UX Libraries
- **React Hot Toast** cho notifications
- **React Icons** cho icon system
- **React Intersection Observer** cho scroll effects
- **React Particles** cho particle effects

### Development Tools
- **Create React App** setup
- **ESLint** cho code quality
- **CSS Custom Properties** cho theming
- **Modern CSS** với Flexbox và Grid

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm hoặc yarn

### Installation
```bash
# Clone repository
git clone [repository-url]
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production
```bash
# Create optimized build
npm run build

# Test production build locally
npx serve -s build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AdvancedParticles/     # Particle effects system
│   ├── CustomCursor/          # Custom cursor với trails
│   ├── FloatingActions/       # FAB system
│   ├── ScrollProgress/        # Scroll indicators
│   ├── AdvancedLoader/        # Loading screen
│   ├── Contact/               # Contact form
│   ├── Blog/                  # Blog system
│   ├── ThemeToggle/           # Theme switching
│   └── ...                    # Other components
├── contexts/
│   └── ThemeContext.js        # Theme management
├── Assets/                    # Images và media files
└── style.css                  # Global styles
```

## 🎨 Customization

### Theme Colors
```css
:root {
  --imp-text-color: #c770f0;
  --glassmorphism-bg: rgba(255, 255, 255, 0.05);
  --shadow-light: rgba(31, 38, 135, 0.37);
}
```

### Particle Effects
```jsx
// Different variants cho different sections
<AdvancedParticles variant="floating" />     // Hero
<AdvancedParticles variant="constellation" /> // About
<AdvancedParticles variant="galaxy" />       // Projects
```

### Email Configuration
1. Tạo account tại [EmailJS](https://emailjs.com)
2. Cập nhật credentials trong `Contact.js`:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID', 
  formData,
  'YOUR_PUBLIC_KEY'
);
```

## 📊 Performance Features

- **Lazy Loading**: Images và components load on demand
- **Code Splitting**: Route-based splitting
- **Optimized Animations**: 60fps với GPU acceleration
- **Efficient Rendering**: React.memo và useMemo
- **Compressed Assets**: Optimized images và fonts

## 🔧 Available Scripts

### `npm start`
Chạy app ở development mode tại [http://localhost:3000](http://localhost:3000)

### `npm test`
Chạy test suite

### `npm run build`
Build app cho production với optimizations

### `npm run eject`
⚠️ One-way operation - extracts configuration files

## 📱 Browser Support

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+
- **Mobile browsers** với modern features

## 🌟 Key Highlights

✅ **World-class UI** với advanced animations  
✅ **Interactive elements** thu hút users  
✅ **Performance optimized** cho mọi devices  
✅ **SEO ready** với comprehensive meta tags  
✅ **Mobile-first** responsive design  
✅ **Accessibility compliant** cho tất cả users  
✅ **Modern tech stack** với latest features  

## 📚 Documentation

- [FEATURES.md](./FEATURES.md) - Chi tiết tất cả features
- [ADVANCED_UI_FEATURES.md](./ADVANCED_UI_FEATURES.md) - Advanced UI features

## 🎯 Advanced Features Showcase

### 🎨 Particle Effects
- **Floating**: Gentle particles floating upward
- **Constellation**: Connected star-like particles
- **Galaxy**: Rotating cosmic effect
- **Geometric**: Shape-morphing particles

### 🖱️ Custom Cursor
- **Smart Detection**: Different styles for different elements
- **Trailing Effect**: Smooth particle trail
- **Blend Modes**: Advanced visual effects

### 🎭 Loading Experience  
- **Multi-stage Loading**: 5 progressive stages
- **Morphing Shapes**: Dynamic logo transformations
- **Particle Rain**: Animated background elements

### 📊 Scroll Progress
- **Multiple Indicators**: Top bar, circular, and section dots
- **Interactive Navigation**: Click to jump to sections
- **Smooth Animations**: Physics-based movements

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch  
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Made with ❤️ by Nguyen Tien Dung**  
*Portfolio xịn xò với world-class features* ✨

Give a ⭐ if you like this website!

</div>