# nodejs-backend

![CI/CD Pipeline](https://github.com/<YOUR_USERNAME>/<YOUR_REPO>/actions/workflows/ci-cd.yml/badge.svg)

A simple Node.js + Express REST API with Hello World endpoint and full CI/CD pipeline via GitHub Actions.

## 🚀 Endpoints

| Method | Path      | Response                        |
|--------|-----------|---------------------------------|
| GET    | `/`       | `{ "message": "Hello World" }` |
| GET    | `/health` | `{ "status": "ok" }`           |

## 📦 Setup & Run Locally

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (develo 
#pment with auto-reload)
npm run dev

# Run tests
npm test
```

Server runs on **http://localhost:3000** by default.

---

## ⚙️ CI/CD với GitHub Actions

Pipeline tự động kích hoạt khi push lên `main` hoặc tạo Pull Request:

```
Push / PR → main
      │
      ▼
  [Job: CI] Build & Test
      │  npm ci → npm test
      │  (runs on ALL push & PR)
      │
      ▼ (only on push to main, after CI passes)
  [Job: CD] Deploy to Render
         curl Render Deploy Hook URL
```

### Cách thiết lập CD (Deploy lên Render)

1. Tạo tài khoản tại [render.com](https://render.com) → **New Web Service** → kết nối GitHub repo này
2. Vào **Render Dashboard → Service → Settings → Deploy Hook** → copy URL
3. Vào **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**
   - Name: `RENDER_DEPLOY_HOOK_URL`
   - Value: *URL deploy hook từ bước 2*

Sau đó mỗi lần push lên `main`, GitHub Actions sẽ tự động:
1. ✅ Chạy tests
2. 🚀 Trigger deploy lên Render (nếu tests pass)

## 📁 Project Structure

```
nodejs-backend/
├── .github/
│   └── workflows/
│       └── ci-cd.yml      # GitHub Actions pipeline
├── index.js               # Express app (exported for testing)
├── server.js              # Entry point (app.listen)
├── index.test.js          # Jest + supertest tests
├── package.json
├── .gitignore
└── README.md
```
