import React, { useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/editor';

const EditorPage = () => {
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
                <Editor></Editor>
            </div>
        </div>
    )
}

export default EditorPage