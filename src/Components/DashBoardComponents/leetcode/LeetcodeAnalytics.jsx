import React, {useState, useMemo} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    ComposedChart,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {TrendingUp, TrendingDown, Trophy, Clock, Target, Award} from 'lucide-react';

const LeetcodeAnalytics = ({data}) => {
    const [selectedChart, setSelectedChart] = useState('overview')
    console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const processedData = useMemo(() => {
        const history = data.contestHistory || [];
        // Reverse the history to show recent contests first
        const reversedHistory = [...history].reverse();

        // Rating progress data
        const ratingData = reversedHistory.map((contest, index) => ({
            contest: index + 1,
            rating: contest.rating,
            date: new Date(contest.contestDateTime).toLocaleDateString(),
            fullDate: new Date(contest.contestDateTime).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            contestTitle: contest.contestTitle,
            shortTitle: contest.contestTitle.replace('Weekly Contest', 'WC').replace('Biweekly Contest', 'BW'),
            ranking: contest.ranking,
            problemsSolved: contest.problemsSolved,
        }));

        // Rating change calculation
        const ratingChangeData = reversedHistory.map((contest, index) => {
            const prevRating = index > 0 ? reversedHistory[index - 1].rating : contest.rating;
            const change = contest.rating - prevRating;
            return {
                contest: index + 1,
                ratingChange: change,
                rating: contest.rating,
                changeType: change >= 0 ? 'gain' : 'loss',
                absoluteChange: Math.abs(change),
                date: new Date(contest.contestDateTime).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                }),
                contestTitle: contest.contestTitle,
                ranking: contest.ranking
            }
        });

        // Trend direction stats
        const trendStats = history.reduce((acc, contest) => {
            acc[contest.trendDirection] = (acc[contest.trendDirection] || 0) + 1;
            return acc;
        }, {});

        const trendData = Object.entries(trendStats).map(([direction, count]) => ({
            direction, count, percentage: ((count / history.length) * 100).toFixed(1)
        }));

        // Problems solved data
        const problemsData = reversedHistory.map((contest, index) => ({
            contest: index + 1,
            solved: contest.problemsSolved,
            total: contest.totalProblems,
            efficiency: ((contest.problemsSolved / contest.totalProblems) * 100).toFixed(1),
            date: new Date(contest.contestDateTime).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            contestTitle: contest.contestTitle,
            ranking: contest.ranking,
            finishTime: (contest.finishTimeInSeconds / 60).toFixed(1)
        }));

        //finished time data
        const timeData = reversedHistory.map((contest, index) => ({
            contest: index + 1,
            finishTime: contest.finishTimeInSeconds,
            finishTimeMinutes: (contest.finishTimeInSeconds / 60).toFixed(1),
            solved: contest.problemsSolved,
            date: new Date(contest.contestDateTime).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }),
            contestTitle: contest.contestTitle,
            ranking: contest.ranking,
            rating: contest.rating
        }));

        // Performance heatmap data
        const heatmapData = reversedHistory.map((contest, index) => {
            const prevRating = index > 0 ? reversedHistory[index - 1].rating : contest.rating;
            const change = contest.rating - prevRating;
            return {
                contest: index + 1,
                ratingDelta: change,
                intensity: Math.abs(change),
                performance: change >= 0 ? 'positive' : 'negative',
                date: new Date(contest.contestDateTime).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                }),
                contestTitle: contest.contestTitle
            };
        });

        return {
            ratingData, ratingChangeData, trendData, problemsData, timeData, heatmapData
        };
    }, [data]);

    const colors = {
        primary: '#3B82F6',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#06B6D4',
        purple: '#8B5CF6'
    }

    const StatCard = ({title, value, icon: Icon, trend, color = 'primary'}) => (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{borderColor: colors[color]}}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {trend && (<p className={`text-sm ${trend.type === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.value}
                    </p>)}
                </div>
                <Icon className="w-8 h-8" style={{color: colors[color]}}/>
            </div>
        </div>);

    const RatingProgressChart = () => {
        // Calculate Y-axis domain based on actual data range
        const ratings = processedData.ratingData.map(d => d.rating);
        const minRating = Math.min(...ratings);
        const maxRating = Math.max(...ratings);
        const padding = (maxRating - minRating) * 0.1; // 10% padding
        const yAxisMin = Math.max(0, minRating - padding);
        const yAxisMax = maxRating + padding;

        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Rating Progress Over Time</h3>
                <ResponsiveContainer height={300} width="100%">
                    <LineChart data={processedData.ratingData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="contest" label={{value: 'Contest Number', position: 'insideBottom', offset: -5}}/>
                        <YAxis
                            label={{value: 'Rating', angle: -90, position: 'insideLeft'}}
                            domain={[1100, 2300]}
                        />
                        <Tooltip formatter={(value, name) => [Math.round(value), 'Rating']}
                                 labelFormatter={(label, payload) => {
                                     if (payload && payload[0]) {
                                         const data = payload[0].payload;
                                         return `${data.contestTitle} (${data.fullDate})`;
                                     }
                                     return `Contest ${label}`;
                                 }}
                                 content={({active, payload, label}) => {
                                     if (active && payload && payload.length) {
                                         const data = payload[0].payload;
                                         return (<div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                                             <p className="font-semibold text-gray-800">{data.contestTitle}</p>
                                             <p className="text-sm text-gray-600">{data.fullDate}</p>
                                             <p className="text-blue-600 font-medium">Rating: {Math.round(data.rating)}</p>
                                             <p className="text-gray-700">Ranking: #{data.ranking.toLocaleString()}</p>
                                             <p className="text-gray-700">Problems Solved: {data.problemsSolved}/4</p>
                                         </div>);
                                     }
                                     return null;
                                 }}/>
                        <Line type="monotone" dataKey="rating" stroke={colors.primary} strokeWidth={3}
                              dot={{fill: colors.primary, strokeWidth: 2, r: 4}}
                              activeDot={{r: 6}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const TrendDirectionChart = () => (<div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Trend Distribution</h3>
        <div className="grid grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={processedData.trendData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({direction, percentage}) => `${direction}: ${percentage}%`}
                    >
                        {processedData.trendData.map((entry, index) => (<Cell key={`cell-${index}`}
                                                                              fill={entry.direction === 'UP' ? colors.success : colors.danger}/>))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
                {processedData.trendData.map((trend, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{backgroundColor: trend.direction === 'UP' ? colors.success : colors.danger}}
                        />
                        <span
                            className="text-sm font-medium">{trend.direction}: {trend.count} contests ({trend.percentage}%)</span>
                    </div>))}
            </div>
        </div>
    </div>);

    const ProblemsChart = () => (<div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Problems Solved per Contest</h3>
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={processedData.problemsData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="contest"/>
                <YAxis/>
                <Tooltip
                    content={({active, payload, label}) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (<div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                                <p className="font-semibold text-gray-800">{data.contestTitle}</p>
                                <p className="text-sm text-gray-600">{data.date}</p>
                                <p className="text-blue-600 font-medium">Problems
                                    Solved: {data.solved}/{data.total}</p>
                                <p className="text-gray-700">Efficiency: {data.efficiency}%</p>
                                <p className="text-gray-700">Ranking: #{data.ranking.toLocaleString()}</p>
                                <p className="text-gray-700">Finish Time: {data.finishTime}m</p>
                            </div>);
                        }
                        return null;
                    }}
                />
                <Legend/>
                <Bar dataKey="solved" fill={colors.primary} name="Problems Solved"/>
                <Line type="monotone" dataKey="total" stroke={colors.danger} strokeWidth={2} name="Total Problems"/>
            </ComposedChart>
        </ResponsiveContainer>
    </div>);

    const FinishTimeChart = () => (<div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Contest Finish Time</h3>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={processedData.timeData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="contest"/>
                <YAxis label={{value: 'Time (minutes)', angle: -90, position: 'insideLeft'}}/>
                <Tooltip
                    content={({active, payload, label}) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (<div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                                <p className="font-semibold text-gray-800">{data.contestTitle}</p>
                                <p className="text-sm text-gray-600">{data.date}</p>
                                <p className="text-blue-600 font-medium">
                                    Finish Time: {data.finishTimeMinutes}m ({data.finishTime}s)
                                </p>
                                <p className="text-gray-700">Problems Solved: {data.solved}/4</p>
                                <p className="text-gray-700">Ranking: #{data.ranking.toLocaleString()}</p>
                                <p className="text-gray-700">Rating: {Math.round(data.rating)}</p>
                            </div>);
                        }
                        return null;
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="finishTimeMinutes"
                    stroke={colors.info}
                    fill={colors.info}
                    fillOpacity={0.3}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>);

    const RatingChangeChart = () => (<div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Rating Change per Contest</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData.ratingChangeData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="contest"/>
                <YAxis/>
                <Tooltip
                    content={({active, payload, label}) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (<div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                                <p className="font-semibold text-gray-800">{data.contestTitle}</p>
                                <p className="text-sm text-gray-600">{data.date}</p>
                                <p className={`font-medium ${data.ratingChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    Rating
                                    Change: {data.ratingChange >= 0 ? '+' : ''}{data.ratingChange.toFixed(1)}
                                </p>
                                <p className="text-gray-700">New Rating: {Math.round(data.rating)}</p>
                                <p className="text-gray-700">Ranking: #{data.ranking.toLocaleString()}</p>
                            </div>);
                        }
                        return null;
                    }}
                />
                <Bar
                    dataKey="ratingChange"
                    fill={(entry) => entry?.ratingChange >= 0 ? colors.success : colors.danger}
                >
                    {processedData.ratingChangeData.map((entry, index) => (<Cell key={`cell-${index}`}
                                                                                 fill={entry.ratingChange >= 0 ? colors.success : colors.danger}/>))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>);

    const PerformanceHeatmap = () => (<div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Heatmap</h3>
        <div className="grid grid-cols-10 gap-1">
            {processedData.heatmapData.map((contest, index) => (<div
                key={index}
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-semibold text-white cursor-pointer"
                style={{
                    backgroundColor: contest.performance === 'positive' ? `rgba(16, 185, 129, ${Math.min(contest.intensity / 50, 1)})` : `rgba(239, 68, 68, ${Math.min(contest.intensity / 50, 1)})`
                }}
                title={`${contest.contestTitle} (${contest.date}): ${contest.ratingDelta >= 0 ? '+' : ''}${contest.ratingDelta.toFixed(1)} rating change`}
            >
                {contest.contest}
            </div>))}
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>Rating Loss</span>
            <div className="flex space-x-1">
                <div className="w-4 h-4 bg-red-200 rounded"></div>
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <div className="w-4 h-4 bg-green-600 rounded"></div>
            </div>
            <span>Rating Gain</span>
        </div>
    </div>);

    const avgRating = data.contestHistory?.reduce((sum, c) => sum + c.rating, 0) / data.contestHistory.length || 0;
    const avgProblems = data.contestHistory?.reduce((sum, c) => sum + c.problemsSolved, 0) / data.contestHistory.length || 0;
    const avgTime = data.contestHistory?.reduce((sum, c) => sum + c.finishTimeInSeconds, 0) / data.contestHistory.length || 0;
    const upTrends = data.contestHistory?.filter(c => c.trendDirection === 'UP').length || 0;

    return (<div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">LeetCode Analytics Dashboard</h1>
                    <p className="text-gray-600">Performance insights for {data.username}</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Current Rating"
                        value={Math.round(data.rating)}
                        icon={Trophy}
                        color="success"
                    />
                    <StatCard
                        title="Global Ranking"
                        value={`#${data.globalRanking.toLocaleString()}`}
                        icon={Award}
                        color="primary"
                    />
                    <StatCard
                        title="Contests Attended"
                        value={data.attendedContestsCount}
                        icon={Target}
                        color="info"
                    />
                    <StatCard
                        title="Top Percentage"
                        value={`${data.topPercentage}%`}
                        icon={TrendingUp}
                        color="warning"
                    />
                </div>
                {/* Navigation */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {[{id: 'overview', label: 'Overview'}, {
                                id: 'rating',
                                label: 'Rating Analysis'
                            }, {id: 'performance', label: 'Performance'}, {
                                id: 'trends',
                                label: 'Trends'
                            }].map((tab) => (<button key={tab.id} onClick={() => setSelectedChart(tab.id)}
                                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedChart === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                {tab.label}
                            </button>))}
                        </nav>
                    </div>
                </div>

                {/*charts */}
                <div className="space-y-6">
                    {selectedChart === 'overview' && (<>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <RatingProgressChart/>
                            <TrendDirectionChart/>
                        </div>
                        <PerformanceHeatmap/>
                    </>)

                    }
                    {selectedChart === 'rating' && (<>
                        <RatingProgressChart/>
                        <RatingChangeChart/>
                    </>)}

                    {selectedChart === 'performance' && (<>
                        <div className="space-y-6">
                            <ProblemsChart/>
                            <FinishTimeChart/>
                        </div>
                    </>)}

                    {selectedChart === 'trends' && (<>
                        <TrendDirectionChart/>
                        <PerformanceHeatmap/>
                    </>)}

                </div>
                {/* Additional Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <StatCard
                        title="Average Rating"
                        value={Math.round(avgRating)}
                        icon={Trophy}
                        color="purple"
                    />
                    <StatCard
                        title="Avg Problems/Contest"
                        value={avgProblems.toFixed(1)}
                        icon={Target}
                        color="success"
                    />
                    <StatCard
                        title="Avg Finish Time"
                        value={`${Math.round(avgTime / 60)}m`}
                        icon={Clock}
                        color="info"
                    />
                    <StatCard
                        title="Upward Trends"
                        value={`${upTrends}/${data.attendedContestsCount}`}
                        icon={TrendingUp}
                        color="warning"
                    />
                </div>
            </div>
        </div>
    );
}
export default LeetcodeAnalytics;