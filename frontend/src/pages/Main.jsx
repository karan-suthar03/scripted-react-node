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


function Main() {
    const data = [
        { id: 1,
            content: {
                snippet: "and then he went to the river",
                image: "https://picsum.photos/id/1000/500/300",
            }
        },
        { id: 2,
            content: {
                snippet: "and he saw a boat",
                image: "https://picsum.photos/id/1001/500/300",
            }
        },
        { id: 3,
            content: {
                snippet: "and he got on the boat",
                image: "https://picsum.photos/id/1002/500/300",
            }
        },
        { id: 4,
            content: {
                snippet: "and he sailed away",
                image: "https://picsum.photos/id/1003/500/300",
            }
        },
        { id: 5,
            content: {
                snippet: "and he found an island",
                image: "https://picsum.photos/id/1004/500/300",
            }
        },
        { id: 6,
            content: {
                snippet: "and he lived happily ever after",
                image: "https://picsum.photos/id/1005/500/300",
            }
        },
    ];

    return (
        <div className="flex flex-col items-center min-h-screen max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex w-full bg-[#FEFCF9] mt-16 mb-12">
                <h1 className="text-6xl font-semibold text-gray-800">
                    The Adventures of Tom Sawyer
                </h1>
            </div>

            <div className="w-full">
                {data.map((item, index) => (
                    <Node key={index}>
                        <p className="mb-2">{item.content.snippet}</p>
                        <img src={item.content.image} alt="Story snippet" className="w-1/2 h-auto rounded-lg shadow-md mb-4" />
                    </Node>
                ))}
                <Node>
                    <Options />
                </Node>
            </div>
        </div>
    );
}

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



function PathCard() {
    return (
        <div className="flex flex-col p-6 bg-[#FDF5F1] rounded-lg border border-[#FDB37A] cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:bg-[#FDD0C5] hover:text-gray-800 text-gray-600">
            <h2 className="text-xl font-semibold break-words line-clamp-2">
                aslkdjaldkjalskjdlaksjdlakjdlkjjalskjdlaskjda
            </h2>
        </div>
    )
}

export default Main;