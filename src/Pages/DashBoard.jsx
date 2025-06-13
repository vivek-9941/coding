import React from "react";
import OverallSummary from "../Components/DashBoardComponents/OverallSummary.jsx";
const Dashboard = ({platform}) => {
 if (platform === "Overall") return <OverallSummary />;
 // if (platform === "LeetCode") return < />;
 // if (platform === "Codeforces") return < />;
 // if (platform === "CodeChef") return < />;
};

export default Dashboard;
