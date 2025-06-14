const LeetcodeSubmissionStats = ({data}) => {
    // console.log(data);
    const stats = [
        {
            title: 'All Problems',
            accepted: data.all_count,
            submitted: data.allSubmission,
            rejected: data.allSubmission - data.all_count,
            color: '#3B82F6'
        },
        {
            title: 'Easy Problems',
            accepted: data.easy,
            submitted: data.easySubmission,
            rejected: data.easySubmission - data.easy,
            color: '#10B981'
        },
        {
            title: 'Medium Problems',
            accepted: data.medium,
            submitted: data.mediumSubmission,
            rejected: data.mediumSubmission - data.medium,
            color: '#F59E0B'

        },
        {
            title: 'Hard Problems',
            accepted: data.hard,
            submitted: data.hardSubmission,
            rejected: data.hardSubmission - data.hard,
            color: '#EF4444'
        }

    ];
    const Dountchart = ({stat, size = 120}) => {
        const {title, accepted, submitted, rejected, color} = stat;
        const accuracy = submitted > 0 ? ((accepted / submitted) * 100).toFixed(1) : 0;
        const radius = size / 2 - 10;
        const strokeWidth = 12;
        const normalizedRadius = radius - strokeWidth * 0.5;
        const circumference = normalizedRadius * 2 * Math.PI;
        const acceptedPercentage = submitted > 0 ? (accepted / submitted) * 100 : 0;
        const acceptedStrokeDasharray = `${(acceptedPercentage / 100) * circumference} ${circumference}`;
        return (
            <div className="flex flex-col items-center p-4 rounded-lg shadow-lg">
                <h3 className={`text-lg font-semibold text-gray-800 mb-3`}>{title}</h3>
                <div className="relative">
                    <svg height={size} width={size} className="transform -rotate-90">
                        {/*    background ciricle*/}
                        <circle stroke="#E5E7EB"
                                fill="transparent"
                                strokeWidth={strokeWidth}
                                r={normalizedRadius}
                                cx={size / 2}
                                cy={size / 2}/>
                        {/*accepted portion*/}
                        <circle
                            stroke={color}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeDasharray={acceptedStrokeDasharray}
                            strokeDashoffset={0}
                            strokeLinecap="round"
                            r={normalizedRadius}
                            cx={size / 2}
                            cy={size / 2}
                            className="transition-all duration-300 ease-in-out"/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-800">{accepted}</div>
                        <div className="text-xs text-gray-500">/{submitted}</div>
                    </div>
                </div>
                {/* Legend */}
                <div className="mt-3 flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }}></div>
                        <span className="text-gray-600">Accepted: {accepted}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-gray-600">Rejected: {rejected}</span>
                    </div>
                </div>

                {/* Accuracy */}
                <div className="mt-2 text-center">
                    <div className="text-xl font-bold" style={{ color: color }}>
                        {accuracy}%
                    </div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                </div>
            </div>
        )
    };
return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Submission Statistics
            </h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
             {stats.map((stats, index) => (
                     <Dountchart key={index} stat={stats} />
                     )
                 )}
         </div>
            {/*summary*/}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{data.allSubmission}</div>
                        <div className="text-sm text-gray-500">Total Submissions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{data.all_count}</div>
                        <div className="text-sm text-gray-500">Total Accepted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{data.allSubmission - data.all_count}</div>
                        <div className="text-sm text-gray-500">Total Rejected</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {((data.all_count / data.allSubmission) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">Overall Accuracy</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                )
}

export default LeetcodeSubmissionStats;