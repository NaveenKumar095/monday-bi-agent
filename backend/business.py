from collections import Counter


def safe_float(value):
    if value is None:
        return 0

    try:
        return float(str(value).replace(",", ""))
    except:
        return 0


def pipeline_summary(deals):

    items = deals["items"]

    total_pipeline = 0

    sector_counter = Counter()
    stage_counter = Counter()
    status_counter = Counter()

    sector_pipeline = {}

    for deal in items:

        value = safe_float(deal.get("masked_deal_value"))
        total_pipeline += value

        sector = deal.get("sector_service") or "Unknown"
        sector_counter[sector] += 1

        sector_pipeline[sector] = (
            sector_pipeline.get(sector, 0) + value
        )

        stage = deal.get("deal_stage")
        if stage:
            stage_counter[stage] += 1

        status = deal.get("deal_status")
        if status:
            status_counter[status] += 1

    return {
        "total_pipeline_value": total_pipeline,
        "sector_distribution": dict(sector_counter),
        "sector_pipeline_value": sector_pipeline,
        "deal_stage_distribution": dict(stage_counter),
        "status_distribution": dict(status_counter)
    }


def leadership_summary(deals):

    summary = pipeline_summary(deals)

    total_pipeline = summary["total_pipeline_value"]
    sectors = summary["sector_pipeline_value"]
    stages = summary["deal_stage_distribution"]
    status = summary["status_distribution"]

    top_sector = max(sectors, key=sectors.get) if sectors else "Unknown"
    top_stage = max(stages, key=stages.get) if stages else "Unknown"

    top_sector_value = sectors.get(top_sector, 0)

    sector_percentage = 0
    if total_pipeline > 0:
        sector_percentage = round(
            (top_sector_value / total_pipeline) * 100,
            2
        )

    insights = []

    if sector_percentage > 60:
        insights.append(
            f"Pipeline is highly concentrated in {top_sector} ({sector_percentage}%)."
        )

    if status.get("On Hold", 0) > 0:
        insights.append(
            f"{status.get('On Hold')} deals are currently on hold."
        )

    if top_stage == "E. Proposal/Commercials Sent":
        insights.append(
            "Most opportunities are close to conversion."
        )

    recommendation = (
        "Focus on closing Proposal-stage deals and diversify the pipeline "
        "across additional sectors."
    )

    return {
        "total_pipeline_value": total_pipeline,
        "top_sector": top_sector,
        "top_sector_value": top_sector_value,
        "top_sector_percentage": sector_percentage,
        "most_common_stage": top_stage,
        "open_deals": status.get("Open", 0),
        "on_hold_deals": status.get("On Hold", 0),
        "insights": insights,
        "recommendation": recommendation
    }