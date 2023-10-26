
export const ChatList = () => {
    return (
        <>
            {/* chat list */}
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                {/* search compt */}
                <div className="border-b-2 py-4 px-2">
                    <input type="text" placeholder="search chatting" className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full" />
                </div>
                {/* end search compt */}
                {/* user list */}
                <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                    <div className="w-1/4">
                        <img src="https://source.unsplash.com/_7LbC5J-jw4/600x600" className="object-cover h-12 w-12 rounded-full" alt='foto mia' />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Luis1994</div>
                        <span className="text-gray-500">Pick me at 9:00 Am</span>
                    </div>
                </div>

                {/* end user list */}
            </div>
            {/* end chat list */}
        </>
    )
}