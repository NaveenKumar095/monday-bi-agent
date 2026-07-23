import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

function StageChart({ data }) {
    if (!data) return null;

    const chartData = Object.entries(data).map(([stage, value]) => ({
        stage,
        deals: value,
    }));

    return (
        <div className="bg-white rounded-xl shadow p-6 h-[420px]">
            <h2 className="text-xl font-bold mb-4">
                📈 Deal Stage Distribution
            </h2>

            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="stage"
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                        height={90}
                        tick={{ fontSize: 11 }}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="deals"
                        fill="#2563EB"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StageChart;