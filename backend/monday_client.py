import requests
from config import MONDAY_API_TOKEN
from cleaner import clean_items

URL = "https://api.monday.com/v2"

headers = {
    "Authorization": MONDAY_API_TOKEN,
    "Content-Type": "application/json"
}


def get_board_items(board_id, limit=50):
    query = f"""
    query {{
      boards(ids: {board_id}) {{
        name
        items_page(limit: {limit}) {{
          items {{
            id
            name
            column_values {{
              column {{
                title
              }}
              text
            }}
          }}
        }}
      }}
    }}
    """

    response = requests.post(
        URL,
        headers=headers,
        json={"query": query}
    )

    response.raise_for_status()

    data = response.json()

    # Check for GraphQL errors
    if "errors" in data:
        return {
            "success": False,
            "errors": data["errors"]
        }

    board = data["data"]["boards"][0]

    return {
        "success": True,
        "board_name": board["name"],
        "items": clean_items(board["items_page"]["items"])
    }