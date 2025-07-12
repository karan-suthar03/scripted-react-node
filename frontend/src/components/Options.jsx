import PathCard from "./PathCard.jsx";

function Options() {
    return <>
        <h1 className="text-4xl font-semibold text-gray-800">
            What path would you like to choose?
        </h1>
        <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-4xl mx-auto">
            <PathCard/>
            <PathCard/>
            <PathCard/>
            <PathCard/>
        </div>
        <div className="flex items-center mt-8 justify-center gap-6">
            <input placeholder={"Write your own"}
                   className="mt-4 p-2 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 max-w-sm focus:ring-[#FDB37A] bg-[#FDF5F1] placeholder:italic"/>
            <button className="mt-4 bg-[#FDD0C5] py-2 px-4 rounded-lg hover:bg-[#e3bdb3] transition-all cursor-pointer">
                Continue
            </button>
        </div>
    </>;
}

export default Options;