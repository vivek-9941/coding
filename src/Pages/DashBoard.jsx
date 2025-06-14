import React from "react";
import OverallSummary from "../Components/DashBoardComponents/overall/OverallSummary.jsx";
import Leetcode from "../Components/DashBoardComponents/leetcode/Leetcode.jsx";
const Dashboard = ({platform}) => {
 if (platform === "Overall") return <OverallSummary />;
 if (platform === "Leetcode") return <Leetcode />
 // if (platform === "Codeforces") return < />;
 // if (platform === "CodeChef") return < />;
};

export default Dashboard;
