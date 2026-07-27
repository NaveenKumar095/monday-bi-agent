from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from services import load_all_data
from monday_client import get_board_items
from config import DEALS_BOARD_ID
from business import pipeline_summary, leadership_summary
from router import detect_intent
from ai import ask_ai
from models import ChatRequest, ChatResponse
from chat_service import process_chat

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:5173",
    "https://monday-bi-agent-sigma.vercel.app",  # Replace if your Vercel URL is different
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://monday-bi-agent-sigma.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"message": "Monday BI Agent Running"}

@app.get("/deals")
def deals():
    return get_board_items(DEALS_BOARD_ID)

@app.get("/all-data")
def all_data():
    return load_all_data()

@app.get("/pipeline-summary")
def pipeline():
    data = load_all_data()
    return pipeline_summary(data["deals"])

@app.get("/sector-summary")
def sector_summary():
    data = load_all_data()
    summary = pipeline_summary(data["deals"])
    return summary["sector_pipeline_value"]

@app.get("/ask")
def ask(question: str = Query(..., description="Ask a business question")):

    intent = detect_intent(question)
    data = load_all_data()

    if intent == "pipeline_summary":
        context = str(pipeline_summary(data["deals"]))

    elif intent == "sector_summary":
        context = str(pipeline_summary(data["deals"])["sector_pipeline_value"])

    elif intent == "leadership_summary":
        context = str(leadership_summary(data["deals"]))

    else:
        context = "No structured business data found."

    prompt = f"""
You are an experienced Business Intelligence consultant.

The company operates in India.
All monetary values are in INR.

Business Data:
{context}

User Question:
{question}

Instructions:
1. Answer as a senior BI consultant.
2. Give a short executive summary.
3. Highlight important insights.
4. Mention any business risks.
5. Mention one recommendation.
6. Never invent numbers.
7. Use only the supplied data.
"""

    answer = ask_ai(prompt)

    return {
        "question": question,
        "intent": intent,
        "answer": answer
    }

@app.get("/test-ai")
def test_ai():
    response = ask_ai("Say Hello from Groq in one sentence.")
    return {"response": response}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = process_chat(request.message)
    return ChatResponse(
        intent=result["intent"],
        response=result["response"]
    )