# Monday.com Business Intelligence Agent

An AI-powered Business Intelligence Dashboard built using **FastAPI**, **React**, **Tailwind CSS**, **Gemini AI**, and the **Monday.com GraphQL API**.

The application retrieves business data from Monday.com, generates key business metrics, visualizes insights through interactive dashboards, and allows executives to ask business questions using natural language.

---

## Features

###  Business Dashboard

- Live KPI Cards
  - Total Pipeline Value
  - Total Deals
  - Top Sector
  - Top Sector Value
- Sector Distribution (Pie Chart)
- Deal Stage Distribution (Bar Chart)

### AI Business Assistant

Ask questions such as:

- Give me a leadership update
- Which sector has the highest pipeline?
- Show proposal stage insights
- What are today's business risks?

The assistant generates:

- Executive Summary
- Business Insights
- Risks
- Recommendations

using Google Gemini AI.

---

##  Architecture

```
                Monday.com
                    │
             GraphQL API
                    │
            FastAPI Backend
     ┌──────────────┼──────────────┐
     │              │              │
 Cleaner      Business Logic   AI Service
     │              │              │
     └──────────────┼──────────────┘
                    │
               REST API
                    │
             React Frontend
                    │
      KPI Cards • Charts • AI Chat
```

---

##  Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- Recharts
- React Markdown

### Backend

- FastAPI
- Python
- Pydantic
- Google Gemini API
- Monday.com GraphQL API

---

## Project Structure

```
monday-bi-agent/

│
├── backend/
│   ├── app.py
│   ├── ai.py
│   ├── business.py
│   ├── chat_service.py
│   ├── cleaner.py
│   ├── config.py
│   ├── models.py
│   ├── monday_client.py
│   ├── router.py
│   ├── services.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
MONDAY_API_TOKEN=YOUR_MONDAY_API_TOKEN
DEALS_BOARD_ID=YOUR_DEALS_BOARD_ID
WORK_ORDERS_BOARD_ID=YOUR_WORK_ORDERS_BOARD_ID
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Frontend (.env)

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

##  Running the Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger:

```
http://127.0.0.1:8000/docs
```

---

##  Running the Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

##  API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Health Check |
| GET | `/pipeline-summary` | Business KPI Summary |
| GET | `/all-data` | Monday.com Data |
| GET | `/deals` | Deals Board |
| POST | `/chat` | AI Business Assistant |

---

##  Example AI Request

### Request

```json
{
  "message": "Give me a leadership update"
}
```

### Response

```
Executive Summary

Current pipeline value: ₹687M

Business Insights

• Tender sector contributes the majority of pipeline value.

Risks

• High dependency on one sector.

Recommendation

• Diversify pipeline and prioritize proposal-stage deals.
```

---

##  Dashboard Features

- Live KPI Dashboard
- Interactive Pie Chart
- Interactive Bar Chart
- AI Business Chat
- Markdown Rendering
- Responsive Design

---

##  Future Enhancements

- Authentication
- Export reports (PDF/Excel)
- Historical trend analysis
- Real-time dashboard updates
- Role-based access
- Dark mode
- Conversation history

---

##  Author

Developed as part of the **Monday.com Business Intelligence Agent Assignment**.

Built with:

- FastAPI
- React
- Tailwind CSS
- Gemini AI
- Monday.com GraphQL API
