import React from 'react'

const Home = () => {
    return (
        <div class="HomePageWrapper">
            <div class="FormWrapper">
                <img className='homePageLogo' src="/CoDeC.png" alt="CoDeC-Logo"></img>
                <h4 className='mainLabel'>Paste invitation Room ID</h4>
                <div className="inputGroup">
                    <input type="text" className='inputBox' placeholder='Room ID'></input>
                    <input type="text" className='inputBox' placeholder='USER NAME'></input>
                    <button className='btn joinBtn'>Join</button>
                    <span className='createInfo'>
                        If you don't have an invite then create &nbsp;
                        <a href="" className='createNewBtn'>new room</a>
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