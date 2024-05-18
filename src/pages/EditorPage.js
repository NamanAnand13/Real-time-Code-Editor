import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation } from 'react-router-dom';


const EditorPage = () => {
    const socketRef = useRef(null);
    const location = useLocation();
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            // socketRef.current.emit(ACTIONS.JOIN, {
            //     roomId,
            //     username: location.state?.username,
            // });
        }
    }, [])
    const [clients, setClients] = useState([
        { socketId: 1, username: "naman a" },
        // { socketId: 2, username: "hims jain" },
        // { socketId: 3, username: "faiz" },
    ]);
    return (
        <div className='mainWrap'>
            <div className='aside'>
                <div className='asideInner'>
                    <div className='logo'>
                        <img src='/CoDeC.png' alt='codec-logo' className='logoEditor'></img>
                    </div>
                    <h3>Connected</h3>
                    <div className='userList'>
                        {
                            clients.map((client) => (
                                <Client username={client.username} key={client.socketId} />
                            ))
                        }
                    </div>
                </div>
                <button className='btn copyBtn'>Copy ROOM ID</button>
                <button className='btn LeaveBtn'>Leave</button>
            </div>
            <div className='editorWrap'>
                <Editor />
            </div>
        </div>
    )
}

export default EditorPage