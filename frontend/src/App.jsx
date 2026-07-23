import { useEffect, useState } from "react";
import api from "./services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectorChart from "./components/SectorChart";
import StageChart from "./components/StageChart";

function App() {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/pipeline-summary");
        setData(response.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    }

    loadDashboard();
  }, []);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await api.post("/chat", {
        message: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Unable to contact the AI service.",
        },
      ]);
    }

    setLoading(false);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const totalDeals = Object.values(data.sector_distribution).reduce(
    (sum, value) => sum + value,
    0
  );

  const topSector = Object.entries(data.sector_pipeline_value).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-blue-600">
            Monday BI Dashboard 🚀
          </h1>

          <p className="text-gray-500">
            Business Intelligence Agent
          </p>

        </div>
      </header>

      {/* Main */}

      <main className="max-w-7xl mx-auto p-8">

        <h2 className="text-2xl font-bold mb-6">
          Executive Overview
        </h2>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card
            title="Pipeline Value"
            value={`₹ ${(data.total_pipeline_value / 10000000).toFixed(2)} Cr`}
          />

          <Card
            title="Total Deals"
            value={totalDeals}
          />

          <Card
            title="Top Sector"
            value={topSector[0]}
          />

          <Card
            title="Top Sector Value"
            value={`₹ ${(topSector[1] / 10000000).toFixed(2)} Cr`}
          />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

          <SectorChart
            data={data.sector_pipeline_value}
          />

          <StageChart
            data={data.deal_stage_distribution}
          />

        </div>

        {/* AI Assistant */}

        <div className="bg-white rounded-xl shadow mt-10">

          <div className="border-b px-6 py-4">

            <h2 className="text-2xl font-bold">
              🤖 AI Business Assistant
            </h2>

          </div>

          {/* Chat Window */}

          <div className="h-96 overflow-y-auto bg-gray-50 p-6">

            {messages.length === 0 ? (

              <div className="text-gray-500">

                <p className="mb-4">
                  Ask questions about your Monday.com business data.
                </p>

                <div className="text-sm">

                  <p className="font-semibold mb-2">
                    Try asking:
                  </p>

                  <ul className="list-disc ml-6 space-y-1">
                    <li>Give me a leadership update</li>
                    <li>Which sector has the highest pipeline?</li>
                    <li>Show proposal stage insights</li>
                    <li>What are today's business risks?</li>
                  </ul>

                </div>

              </div>

            ) : (

              messages.map((message, index) => (

                <div
                  key={index}
                  className={`mb-5 flex ${message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                    }`}
                >

                  <div
                    className={`max-w-3xl px-4 py-3 rounded-xl whitespace-pre-wrap shadow ${message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                      }`}
                  >

                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>

                  </div>

                </div>

              ))

            )}

            {loading && (

              <div className="text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span>Analyzing your business...</span>
                </div>
              </div>

            )}

          </div>

          {/* Input */}

          <div className="border-t p-4 flex gap-3">

            <input
              type="text"
              placeholder="Ask a business question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3 text-gray-800">
        {value}
      </h2>

    </div>
  );
}

export default App;