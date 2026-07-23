def clean_items(items):
    cleaned = []

    for item in items:
        row = {
            "id": item["id"],
            "name": item["name"]
        }

        for column in item["column_values"]:
            key = (
                column["column"]["title"]
                .strip()
                .lower()
                .replace(" ", "_")
                .replace("/", "_")
                .replace("(", "")
                .replace(")", "")
            )

            row[key] = column["text"] if column["text"] else None

        cleaned.append(row)

    return cleaned