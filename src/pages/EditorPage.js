import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();
    const codeRef = useRef(null);
    const { roomId } = useParams(); // gets the roomId from the url / session
    const [clients, setClients] = useState([]);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success("RoomId copied on clipboard successfully");
        }
        catch (err) {
            toast.error("Error copying RoomId");
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleError(err));
            socketRef.current.on('connect_failed', (err) => handleError(err));

            function handleError(err) {
                console.log(err);
                toast.error('Socket conenction failed, try again later');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            //Listening for new connections
            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room`);
                }
                console.log(`${username} joined`);
                setClients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code : codeRef.current,
                    socketId
                });
            });

            //Listening for disconnection
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room`);
                setClients((prev) => {
                    return prev.filter((client) => client.socketId !== socketId);
                });
            });
        }
        init();

        return () => {
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        }
    }, []);

    if (!location.state) {
        return <Navigate to='/'></Navigate>
    }

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
                <button className='btn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
                <button className='btn LeaveBtn' onClick={leaveRoom}>Leave</button>
            </div>
            <div className='editorWrap'>
                <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => { codeRef.current = code }} />
            </div>
        </div>
    )
}

export default EditorPage