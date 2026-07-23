import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#2563EB",
    "#16A34A",
    "#F59E0B",
    "#DC2626",
    "#9333EA",
    "#0891B2",
    "#65A30D",
    "#DB2777",
];

function SectorChart({ data }) {
    if (!data) return null;

    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="bg-white rounded-xl shadow p-6 h-[420px]">
            <h2 className="text-xl font-bold mb-4">
                📊 Sector Distribution
            </h2>

            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SectorChart;