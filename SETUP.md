# Focus - 最小化框架

## 项目结构

```
Focus/
├── backend/
│   ├── app/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── .env
```

## 快速开始

### 后端

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app/main.py
```

访问：http://localhost:8000/api/health

### 前端

```bash
cd frontend
npm install
npm run dev
```

访问：http://localhost:3000
