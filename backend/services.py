from monday_client import get_board_items
from config import DEALS_BOARD_ID, WORK_ORDERS_BOARD_ID


def load_all_data():
    deals = get_board_items(DEALS_BOARD_ID)
    work_orders = get_board_items(WORK_ORDERS_BOARD_ID)

    return {
        "deals": deals,
        "work_orders": work_orders
    }