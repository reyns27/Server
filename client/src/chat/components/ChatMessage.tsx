import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { message } from '../interface/message';
const socket = io('/');

export const ChatMessage = () => {

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<message[]>([]);
    
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const newMessage: message = {
            body: message,
            from: 'Me'
        }

        setMessages([...messages, newMessage]);
        socket.emit('message', { body: message, room: 1, from: socket.id });
    };

    useEffect(() => {
        const room:string= '1';
        socket.on('event_set_room',() => {room});
        socket.on('message', receiveMessage)

        return () => {
            socket.off('message')
        }
    }, []);

    const receiveMessage = (message: any) => setMessages((state) => [...state, message]);

    return (
        <>
            {/* message */}
            <div className="w-full px-5 flex flex-col justify-between h-screen">
                <div className="flex flex-col mt-5">
                    <ul>
                        {
                            messages.map((message, i) => (
                                <li key={i}
                                    className={`flex md-4 mt-2 ${message.from == 'Me' ? 'justify-end' : 'justify-start'}`}>
                                    {
                                        message.from == 'Me'
                                            ?
                                            <><div className={`mr-2 py-3 px-4 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white bg-blue-400 justify-end`}>
                                                {message.body}
                                            </div><div className={`h-12 w-12 p-2 rounded-full text-white font-semibold flex items-center justify-center  bg-blue-400`}>
                                                    {message.from}
                                                </div></>
                                            :
                                            <><div className={`mr-2 h-12 w-12 p-2 rounded-full text-white font-semibold flex items-center justify-center bg-gray-400`}>
                                                {message.from}
                                            </div>
                                                <div className={` py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white justify-start bg-gray-400`}>
                                                    {message.body}
                                                </div>
                                            </>
                                    }

                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-full py-5 flex flex-row">
                    <input
                        className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                        type="text"
                        placeholder="type your message here..."
                        onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={handleSubmit} className='bg-blue-500 py-5 rounded-xl text-white w-200 ml-5'>Send</button>
                </div>
            </div>
            {/* end message */}
        </>
    )
}