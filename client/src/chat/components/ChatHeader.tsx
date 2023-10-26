
const ChatHeader = () => {
    return (
        <>
            {/* headaer */}
            <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                <div className="font-semibold text-2xl">Chat Application</div>
                <div className="w-1/2">
                    <input type="text" placeholder="search IRL" className="rounded-2xl bg-gray-100 py-3 px-5 w-full" />
                </div>
                <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                    JR
                </div>
            </div>
            {/* end header */}
        </>
    )
}

export default ChatHeader