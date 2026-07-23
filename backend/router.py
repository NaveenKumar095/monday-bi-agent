from ai import ask_gemini


AVAILABLE_INTENTS = [
    "pipeline_summary",
    "sector_summary",
    "work_orders",
    "leadership_summary",
    "unknown"
]


def detect_intent(question: str):

    prompt = f"""
You are an intent classifier.

Possible intents:

- pipeline_summary
- sector_summary
- work_orders
- leadership_summary
- unknown

Return ONLY one intent.

Question:
{question}
"""

    intent = ask_gemini(prompt).strip().lower()

    if intent not in AVAILABLE_INTENTS:
        return "unknown"

    return intent