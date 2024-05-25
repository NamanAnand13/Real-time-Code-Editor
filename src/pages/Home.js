import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [roomId, setRoomId] = useState('');
    const [username, setusername] = useState('');
    const navigate = useNavigate();
    // const [clicked, setClicked] = useState(false);

    const handleClick = (e) => {
        console.log(e.code);
        // console.log(e);
        if (e.code === "Enter") {
            joinRoom();
        }
    };

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        // console.log(id);
        setRoomId(id);
        toast.success('Created new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error("Room ID and user name required");
            return;
        }
        navigate(`/editor/${roomId}`, { state: { username } });
    }

    return (
        <div class="HomePageWrapper">
            <div class="FormWrapper">
                <img className='homePageLogo' src="/CoDeC.png" alt="CoDeC-Logo"></img>
                <h4 className='mainLabel'>Paste invitation Room ID</h4>
                <div className="inputGroup">
                    <input type="text" className='inputBox' placeholder='Room ID' value={roomId} onChange={
                        (e) => setRoomId(e.target.value)
                    }
                        onKeyDown={handleClick}
                    ></input>
                    <input type="text" className='inputBox' placeholder='USER NAME' value={username} onChange={
                        (e) => setusername(e.target.value)
                    }
                        onKeyDown={handleClick}
                    ></input>
                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                    <span className='createInfo'>
                        If you don't have an invite then create &nbsp;
                        <a href="" onClick={createNewRoom} className='createNewBtn'>new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built with 💛 by {' '}
                    <a href="https://github.com/NamanAnand13">Naman</a>
                </h4>
            </footer>
        </div >
    )
}

export default Home