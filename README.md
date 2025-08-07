# AI-Powered Page Tweaker Extension

An intelligent browser extension that uses AI to modify webpages with natural language commands.

## 🌟 Features

### 🎨 Color Commands
- Change button colors: `change button color to blue`
- Change background: `make background red` 
- Change text color: `change text to green`

### 👀 Hide/Show Elements
- Hide elements: `hide buttons`, `hide images`
- Show elements: `show buttons`, `show images`

### 📝 Text Styling
- Font styles: `make text bold`, `make text italic`, `underline text`
- Font families: `change font to arial`, `change font to times`
- Text alignment: `center text`, `left text`, `right text`
- Font size: `make text bigger`, `make text smaller`

### 🔄 Reset
- Reset styles: `normal text`, `reset text`

## 🛠️ Technology Stack

- **Frontend**: Chrome Extension (Manifest v3)
- **Backend**: FastAPI + Python
- **AI Model**: Hugging Face Transformers (CodeParrot)
- **Languages**: JavaScript, Python, HTML

## 📁 Project Structure

```
capstoneApp/
├── extension/                 # Browser Extension
│   ├── manifest.json         # Extension configuration
│   ├── popup.html           # Extension popup UI
│   └── popup.js             # Extension logic
├── app.py                   # FastAPI backend server
├── requirements.txt         # Python dependencies
└── test.html               # Test page for development
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/pamyu1/AI-browser-extension.git
cd AI-browser-extension
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Start the Backend Server
```bash
python3 -m uvicorn app:app --reload --port 8000
```

### 4. Install Browser Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder

## 🎯 Usage

1. **Start the backend server** (see installation step 3)
2. **Open any website**
3. **Click the extension icon** in your browser toolbar
4. **Type a natural language command** like:
   - `change background to blue`
   - `make buttons red`
   - `hide images`
   - `make text bold`
5. **Click "Generate"** and watch the magic happen!

## 🧪 Testing

Use the included `test.html` file to test all features:
```bash
open test.html
```

## 🔧 Development

### Backend API
- **Endpoint**: `GET /generate?prompt={your_command}`
- **Response**: `{"code": "generated_javascript_code"}`
- **Server**: http://localhost:8000

### Extension Architecture
- Uses Chrome's `scripting` API for code injection
- Manifest v3 compliant
- CORS enabled for local development

## 📝 Supported Commands

| Category | Examples |
|----------|----------|
| **Colors** | `change button color to {color}`, `make background {color}` |
| **Hide/Show** | `hide buttons`, `show images` |
| **Text Style** | `make text bold`, `make text italic` |
| **Font Family** | `change font to arial`, `change font to times` |
| **Alignment** | `center text`, `left text`, `right text` |
| **Size** | `make text bigger`, `make text smaller` |

## 🎨 Supported Colors
red, blue, green, yellow, purple, orange, pink, black, white, gray, brown, cyan, magenta, lime, navy, maroon, olive, teal, silver, gold

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Future Enhancements

- [ ] Support for more AI models
- [ ] Advanced CSS animations
- [ ] Element selection by clicking
- [ ] Save/load custom commands
- [ ] Multi-language support

## 🐛 Known Issues

- Some websites with strict Content Security Policy may block script injection
- HTTPS sites may have issues with HTTP localhost backend

## 📞 Support

If you encounter any issues, please open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ and AI**
