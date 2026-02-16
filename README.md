# Random Math Question Generator 🧮 available at [math.richardsblogs.com](https://math.richardsblogs.com)

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/richie-rich90454/random-math-question-generator-app?style=social)](https://github.com/richie-rich90454/random-math-question-generator-app)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://math.richardsblogs.com/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![Tauri](https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A comprehensive, free online math question generator that helps students practice algebra, calculus, trigonometry, and more with instant answer verification. Available as both a web application and cross-platform desktop app. Perfect for students, educators, and anyone looking to improve their math skills!

## ✨ Key Features

- **📚 25+ Math Topics**: Comprehensive coverage from basic arithmetic to advanced calculus
- **⚡ Instant Feedback**: Real-time answer checking with detailed explanations
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎯 Progressive Difficulty**: Questions adapt to different skill levels
- **🔢 Math Notation Support**: Beautiful mathematical rendering with MathJax
- **🎲 Unlimited Questions**: Generate endless practice problems
- **💡 Educational Focus**: Designed specifically for learning and practice
- **🖥️ Cross-Platform Desktop App**: Native desktop application built with Tauri (Windows, macOS, Linux)

### Supported Math Topics

| Category | Topics |
|----------|--------|
| **Arithmetic** | Addition, Subtraction, Multiplication, Division |
| **Algebra** | Roots, Logarithms, Exponentials, Factorials, Series |
| **Calculus** | Differentiation, Integration, Limits, Related Rates |
| **Linear Algebra** | Matrix Operations, Vector Operations |
| **Trigonometry** | Sine, Cosine, Tangent, Cosecant, Secant, Cotangent |
| **Discrete Math** | Permutations, Combinations, Probability |

## 🚀 Quick Start

### Live Demo
Try it now: **[https://math.richardsblogs.com/](https://math.richardsblogs.com/)**

### Local Installation (Web Version)

```bash
# Clone the repository
git clone https://github.com/richie-rich90454/random-math-question-generator-app.git
cd random_math_question_generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:1331](http://localhost:1331) in your browser.

### Desktop App Development

```bash
# Install Tauri CLI globally (if not already installed)
npm install -g @tauri-apps/cli

# Start Tauri development (runs both web dev server and desktop app)
npm run tauri dev

# Build desktop application for your platform
npm run tauri build
```

## 🎯 How to Use

1. **Select a Topic**: Choose from 25+ math categories in the dropdown
2. **Generate Question**: Click "Generate Question" to get a new problem
3. **Enter Answer**: Type your solution in the answer box
4. **Check Answer**: Click "Check Answer" or press `Shift+Enter` for instant feedback
5. **Learn**: Review the correct answer and explanation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Properties), JavaScript (ES6 Modules)
- **Math Rendering**: [MathJax](https://www.mathjax.org/) for beautiful mathematical notation
- **Build Tool**: [Vite](https://vitejs.dev/) for fast development and optimized builds
- **Math Engine**: [Math.js](https://mathjs.org/) for complex calculations
- **Desktop Framework**: [Tauri](https://tauri.app/) with Rust for secure, lightweight native applications
- **Build Tools**: Terser for minification, CSSNano for CSS optimization
- **Package Manager**: npm with Node.js

## 📁 Project Structure

```
random_math_question_generator/
├── src/                          # Source code directory
│   ├── index.html               # Main web application interface
│   ├── script.js                # Core application logic (ES6 modules)
│   ├── style.css                # Responsive styling
│   ├── robots.txt               # Search engine directives
│   ├── sitemap.xml              # SEO sitemap
│   ├── modules/                 # Modular math question generators
│   │   ├── math.js              # Main math module loader
│   │   ├── algebra.js           # Algebraic operations
│   │   ├── arithmetic.js        # Basic arithmetic
│   │   ├── calculus.js          # Calculus problems
│   │   ├── linearAlgebra.js     # Matrix and vector operations
│   │   ├── trigonometry.js      # Trigonometric functions
│   │   └── discreteMathematics.js # Combinatorics and probability
│   ├── components/              # UI components
│   ├── utils/                   # Utility functions
│   └── assets/                  # Static assets
├── src-tauri/                   # Tauri desktop application
│   ├── src/                     # Rust source code
│   ├── Cargo.toml               # Rust dependencies
│   ├── tauri.conf.json          # Tauri configuration
│   ├── build.rs                 # Build script
│   └── icons/                   # Application icons
├── public/                      # Public assets
│   ├── favicon.ico              # Desktop application icon
│   ├── favicon.png              # Web application icon
│   ├── apple-touch-icon.png     # iOS app icon
│   ├── NotoSans-VariableFont_wdth_wght.ttf # Custom font
│   └── mathjax/                 # MathJax library
├── dist/                        # Build output directory
├── vite.config.js               # Vite build configuration
├── package.json                 # Project configuration and dependencies
├── package-lock.json            # Dependency lock file
├── LICENSE                      # Apache 2.0 License
├── CODE_OF_CONDUCT.md           # Community guidelines
├── OFL-Noto_Sans.txt            # Font license
├── .github/                     # GitHub Actions workflows
│   └── workflows/
│       ├── release.yml          # Automated release build workflow
│       └── TEST_INSTRUCTIONS.md # Workflow testing instructions
└── README.md                    # This file
```

## 🎨 Features in Detail

### Smart Answer Checking
- Supports multiple correct answer formats
- Handles mathematical equivalences
- Provides detailed feedback
- Supports keyboard shortcuts

### Educational Design
- Progressive difficulty levels
- Clear mathematical notation
- Instant feedback for learning
- Mobile-friendly interface

### Performance Optimized
- Fast server response times
- Optimized bundle sizes with Vite
- Efficient math calculations
- Responsive design

### Cross-Platform Desktop App
- Native performance with Tauri
- Small bundle sizes
- Secure sandboxing
- Windows, macOS, and Linux support

## 🚀 Deployment

### Web Deployment
The application is ready for deployment on any static hosting platform:
- Vercel, Netlify, GitHub Pages
- AWS S3, Google Cloud Storage, Azure Static Websites
- Any static hosting service

### Desktop Application Build
Build cross-platform desktop apps with Tauri:

```bash
# Build for current platform
npm run tauri build

# Build for specific platform (requires cross-compilation setup)
npm run tauri build -- --target x86_64-pc-windows-msvc
npm run tauri build -- --target x86_64-apple-darwin
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

### Automated Releases with GitHub Actions
The project includes a GitHub Actions workflow that automatically builds and packages the application for all platforms when a new release is created.

**Supported Platforms:**
- **Windows**: 32-bit & 64-bit (.exe installers)
- **macOS**: Intel x64 & Apple Silicon (.dmg bundles)
- **Linux**: 32-bit, 64-bit, ARM64 (.AppImage & .deb packages)

**How to create a release:**
1. Go to GitHub repository → Releases → Create a new release
2. Create a tag (e.g., `v3.0.1`)
3. Add release title and description
4. Click "Publish release"

The workflow will automatically:
- Build the web application
- Build desktop apps for all 7 platforms
- Generate release notes with download links
- Upload all artifacts to the release

**Cost**: FREE for public repositories (uses ~105 minutes of GitHub Actions time per release)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Open an issue with detailed descriptions
2. **Suggest Features**: Share your ideas for new math topics or features
3. **Improve Documentation**: Help make the project more accessible
4. **Submit Code**: Fork the repo and create pull requests

### Development Setup
```bash
git clone https://github.com/richie-rich90454/random-math-question-generator-app.git
cd random_math_question_generator
npm install

# For web development
npm run dev

# For desktop app development
npm run tauri dev
```

## 📊 Project Stats

- **25+** Math topics supported
- **1000+** Lines of educational code
- **5** Major math categories
- **Unlimited** Question combinations
- **Instant** Answer verification
- **Cross-platform** Desktop application

## 🌟 Why Star This Project?

- **🎓 Educational Value**: Helps students learn math effectively
- **🚀 Performance**: Fast, responsive, and reliable
- **📱 Accessibility**: Works on all devices and platforms
- **🔧 Well-Maintained**: Regular updates and improvements
- **🎯 Practical**: Real-world educational tool
- **📚 Comprehensive**: Covers high school to college-level math
- **🖥️ Native Desktop**: Lightweight, secure desktop application

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://math.richardsblogs.com/](https://math.richardsblogs.com/)
- **GitHub Repository**: [https://github.com/richie-rich90454/random-math-question-generator-app](https://github.com/richie-rich90454/random-math-question-generator-app)
- **Main Website**: [https://www.richardsblogs.com](https://www.richardsblogs.com)
- **Tauri Framework**: [https://tauri.app/](https://tauri.app/)
- **Vite Build Tool**: [https://vitejs.dev/](https://vitejs.dev/)

---

⭐ **If you find this project helpful, please consider giving it a star!** ⭐

Your support helps more people discover this valuable learning tool and encourages further development.