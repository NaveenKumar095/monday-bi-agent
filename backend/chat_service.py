from services import load_all_data
from router import detect_intent
from business import pipeline_summary, leadership_summary
from ai import ask_gemini


def process_chat(question: str):

    intent = detect_intent(question)

    data = load_all_data()

    if intent == "pipeline_summary":
        context = str(pipeline_summary(data["deals"]))

    elif intent == "sector_summary":
        context = str(
            pipeline_summary(data["deals"])["sector_pipeline_value"]
        )

    elif intent == "leadership_summary":
        context = str(
            leadership_summary(data["deals"])
        )

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
- Answer as a senior BI consultant.
- Give an executive summary.
- Highlight business insights.
- Mention business risks.
- Give one recommendation.
- Never invent numbers.
- Use only the supplied data.
"""

    answer = ask_gemini(prompt)

    return {
        "intent": intent,
        "response": answer
    }