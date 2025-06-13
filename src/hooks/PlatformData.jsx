import {useEffect} from "react";
import {useLeetcode} from "./LeetcodeContext.js";
import {useCodecehf} from "./CodechefContext.js";
import {useCodeforces} from "./CodeforcesContext.js";

export const PlatformData = () => {
    const {fetchLeetcode} = useLeetcode();
    const {fetchcodechef} = useCodecehf();
    const {fetchcodeforces} = useCodeforces();

    useEffect(() => {
        const fetchAndStore = async () => {
            const lastFetched = localStorage.getItem("lastFetched");
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;

            if (!lastFetched || now - parseInt(lastFetched) > oneDay) {
                const leetcodedata = await fetchLeetcode();
                const codechefdata = await fetchcodechef();
                const codeforcesdata = await fetchcodeforces();
                console.log(1)
                // Delay slightly to ensure `data` is updated in hooks
                console.log(lastFetched);
                console.log(leetcodedata);
                console.log(codechefdata)
                console.log(codeforcesdata)
                if (leetcodedata) localStorage.setItem("leetcode", JSON.stringify(leetcodedata));
                if (codechefdata) localStorage.setItem("codechef", JSON.stringify(codechefdata));
                if (codeforcesdata) localStorage.setItem("codeforces", JSON.stringify(codeforcesdata));
                if (leetcodedata && codechefdata && codeforcesdata) localStorage.setItem("lastFetched", now.toString());
            }
        };
        // console.log(2)
        fetchAndStore();
        // console.log(3)

    }, []);

    return null; // Nothing rendered
};
