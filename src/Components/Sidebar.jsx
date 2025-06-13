const sidecontent = ["Overall" ,"Leetcode" , "Codeforces","Codechef"]
const SideBar = ({selected, onSelect}) => {
    return (
        <div className="w-64  h-full p-4 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Platforms</h2>
            {
                sidecontent.map((x) =>(
                    <div
                    key = {x}
                    className={`p-2 cursor-pointer rounded hover:bg-gray-500 ${selected === x ? 'bg-gray-500': ''}`}
                    onClick={() =>{onSelect(x)}}>
                        {x}
                    </div>
                ))
            }
        </div>
    )
}
export default SideBar;