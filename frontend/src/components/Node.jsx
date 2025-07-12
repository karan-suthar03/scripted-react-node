function Node({children}) {
    return (
        <div className="flex relative">
            <div className="w-12 flex flex-col items-center">
                <div className="w-8 h-8 bg-black rounded-full" />
                <div className="flex-grow w-0.5 bg-black my-1" />
            </div>
            <div className="ml-4 flex-1 text-lg text-gray-700">
                {children}
            </div>
        </div>
    );
}

export default Node;