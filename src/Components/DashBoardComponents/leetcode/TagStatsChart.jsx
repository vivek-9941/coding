import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {useState} from "react";

const TagStatsChart = ({data}) => {
    const [showAll, setShowAll] = useState(false);
    const [sortBy, setSortBy] = useState('count');
    const sortedData = [...data].sort((a, b) => {
        if (sortBy === 'count') {
            return b.count - a.count;
        } else {
            return a.name.localeCompare(b.name);
        }
    })
    const displayData = showAll ? sortedData : sortedData.slice(0, 15);

    //calculate the dynamic height
    const chartHeight = Math.max(400, displayData.length * 35);

    return (
        <div className="w-full p-4 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tag-wise Problem Distribution</h2>
                <div className="flex gap-2">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-1 border rounded text-sm">
                        <option value="count">Sort by Count</option>
                        <option value="name">Sort Alphabetically</option>
                    </select>
                    <button onClick={() => setShowAll(!showAll)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        {showAll ? 'Show top 15' : `Show All(${data.length})`}
                    </button>
                </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">
                Showing {displayData.length} of {data.length} tags
            </div>
            <div style={{height: `${chartHeight}px`}} className="w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={displayData}
                        layout="vertical"
                        margin={{top: 10, right: 30, left: 120, bottom: 10}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis
                            type="number"
                            domain={[0, 'dataMax + 10']}
                            tickFormatter={(value) => value.toString()}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={50}
                            tick={{fontSize: 14}}
                            interval={0} // Show all labels
                        />
                        <Tooltip
                            formatter={(value, name) => [value, 'Problems']}
                            labelFormatter={(label) => `Tag: ${label}`}
                        />
                        <Bar
                            dataKey="count"
                            fill="#4f46e5"
                            radius={[0, 4, 4, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>


        </div>
    )
}
export default TagStatsChart;