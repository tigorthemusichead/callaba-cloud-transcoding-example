import {useState, useEffect} from "react";
import Line from "./Line";


function App() {

    const [IP, setIP] = useState(null);
    const [ID, setID] = useState(null);
    const [token, setToken] = useState(null);
    const [serverID, setServerId] = useState(null);
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [FPS, setFPS] = useState(30);
    const [key, setKey] = useState(null);
    const [bitrate, setBitrate] = useState(8000);
    const [restreamID, setRestreamID] = useState(null);

    useEffect(()=>{
        setIP(sessionStorage.getItem('IP'));
        setID(sessionStorage.getItem('ID'));
    },[])

    useEffect(()=>{
        IP && sessionStorage.setItem('IP', IP);
        ID && sessionStorage.setItem('ID', ID);
    },[ID, IP])

    function authorize(){
        fetch('http://' + IP + '/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: "admin",
                        password: ID
                    })
            })
            .then(response => response.json())
            .then(data => {
                setToken(data.token);
                alert('Authorized');
            })
            .catch(()=>{alert("Couldn't authorize")})
    }

    function createServer(){
        fetch('http://' + IP + '/api/srt-servers/create',
            {
                method: 'POST',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        server_name: "srt-server",
                        server_type: "SERVER_TYPE_SRT",
                        server_port: 1935,
                        server_latency: 200,
                        server_maxbw: -1,
                        server_timeout: 60,
                        server_rcvbuf: 48234496,
                        server_active: true
                    })
            })
            .then(response => response.json())
            .then(data => {
                setServerId(data._id);
                alert('Server Created');
            })
            .catch(()=>{alert("Couldn't Create the Server")})
    }

    function removeServer(){
        fetch('http://' + IP + '/api/srt-servers/remove',
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: serverID})
            })
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    setServerId(null);
                    alert('Server Removed');
                }
                else alert("Couldn't Remove The Server")
            })
            .catch(()=>{alert("Couldn't Remove The Server")})
    }

    function createRestream(){
        fetch('http://'+ IP +'/api/restream/create',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'x-access-token': token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    restream_name: "Test restream",
                    input: {
                        input_type: "INPUT_TYPE_SRT_SOFTWARE",
                        input_module_id: serverID,
                        input_stream_id: "",
                        module_name: "MODULE_RESTREAM",
                        entity_name: "Test restream",
                    },
                    output: {
                        output_type: "OUTPUT_TYPE_OTHER_RTMP_URL",
                        output_stream_url : "rtmp://a.rtmp.youtube.com/live2",
                        output_stream_key: key,
                        module_name: "MODULE_RESTREAM"
                    },
                    transcoding: {
                        video_transcoding: "mpsoc_vcu_h264",
                        output_video_bitrate: `${bitrate}`,
                        frame_width: `${width}`,
                        frame_height: `${height}`,
                        filter_fps: `${FPS}`,
                    },
                    active: true
                })
            })
            .then(response => response.json())
            .then((data)=> {
                setRestreamID(data._id);
                alert("Restream Created");
            })
            .catch(()=>{alert("Couldn't Create the Restream")})
    }

    function removeRestream(){
        fetch('http://'+ IP +'/api/restream/remove',
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'x-access-token': token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id: restreamID})
            })
            .then(response => response.json())
            .then(() => {
                setRestreamID(null);
                alert("Restream Removed");
            })
            .catch(()=>{alert("Couldn't Remove the Restream")})
    }

    return (
    <div className={'box'}>
        <h1>GPU Transcoding via Callaba Cloud API</h1>
        <div className="line"/>
        <Line
            active={true}
            name={'Instance IPv4 Address'}
            type={'input'}
            placeholder={ IP ||'Enter the Instance IP'}
            onChange={(e)=>{
                setIP(e.target.value)
            }}

        />
        <Line
            active={true}
            name={'Instance ID'}
            type={'input'}
            placeholder={ID || 'Enter the Instance ID'}
            onChange={(e)=>{
                setID(e.target.value)
            }}
        />
        <Line
            active={IP && ID}
            name={'Authorisation'}
            type={'button'}
            buttonText={'Authorize'}
            onClick={authorize}
            code={`
    function authorize(){
        fetch('http://${IP}/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: "admin",
                        password: ${ID}
                    })
            })
            .then(response => response.json())
            .then(data => {
                setToken(data.token);
                alert('authorized');
            })
            .catch(()=>{alert("Couldn't authorize")})
    }
            `}
        />
        <h2>SRT Server</h2>
        <div className="line"/>
        <Line
            active={token && !serverID}
            name={'Create SRT Server'}
            type={'button'}
            buttonText={'Create Server'}
            onClick={createServer}
            code={`
    function createServer(){
        fetch('http://${IP}/api/srt-servers/create',
            {
                method: 'POST',
                headers: {
                    'x-access-token': ${token},
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        server_name: "srt-server",
                        server_type: "SERVER_TYPE_SRT",
                        server_port: 1935,
                        server_latency: 200,
                        server_maxbw: -1,
                        server_timeout: 60,
                        server_rcvbuf: 48234496,
                        server_active: true
                    })
            })
            .then(response => response.json())
            .then(data => {
                setServerId(data._id);
                alert('Server Created');
            })
            .catch(()=>{alert("Couldn't Create the Server")})
    }
            `}
        />
        <Line
            active={serverID}
            name={'Remove SRT Server'}
            type={'button'}
            buttonText={'Remove Server'}
            onClick={removeServer}
            code={`
    function removeServer(){
        fetch('http://${IP}/api/srt-servers/remove',
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'x-access-token': ${token},
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: ${serverID}})
            })
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    setServerId(null);
                    alert('Server Removed');
                }
                else alert("Couldn't Remove The Server")
            })
            .catch(()=>{alert("Couldn't Remove The Server")})
    }
            `}
        />
        <Line
            active={serverID}
            name={'Copy the URL for streaming from OBS Studio'}
            type={'button'}
            buttonText={'Copy OBS URL'}
            onClick={()=>{
                navigator.clipboard
                    .writeText("srt://" + IP + ":1935?streamid=publisher/srt-server/srt-stream-01&latency=200000&maxbw=-1")
                    .then(()=>{alert("URL is copied")})
                    .catch(()=>{alert("Couldn't copy URL")})
            }}
        />
        <h2>Transcoding</h2>
        <div className="line"/>
        <div className={'line'}>
            <div className={'input'}>
                <p>Bitrate</p>
                <input type={'number'} placeholder={bitrate || 'Bitrate'} onChange={(e)=>{setBitrate(e.target.value)}}/>
            </div>
            <div className={'input'}>
                <p>Frame Width</p>
                <input type={'number'} placeholder={width || 'Frame Width'} onChange={(e)=>{setWidth(e.target.value)}}/>
            </div>
            <div className={'input'}>
                <p>Frame Height</p>
                <input type={'number'} placeholder={height || 'Frame Height'} onChange={(e)=>{setHeight(e.target.value)}}/>
            </div>
            <div className={'input'}>
                <p>FPS</p>
                <input type={'number'} placeholder={FPS || 'FPS'} onChange={(e)=>{setFPS(e.target.value)}}/>
            </div>
            </div>
        <h2>Restreaming</h2>
        <div className="line"/>
        <Line
            active={true}
            name={'Youtube Streaming Key'}
            type={'input'}
            placeholder={'Enter the key'}
            onChange={(e)=>{setKey(e.target.value)}}
        />
        <Line
            active={key && serverID && width && height && FPS && !restreamID}
            name={'Create Restream'}
            type={'button'}
            buttonText={'Create Restream'}
            onClick={createRestream}
            code={`
    function createRestream(){
        fetch('http://${IP}/api/restream/create',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'x-access-token': ${token},
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    restream_name: "Test restream",
                    input: {
                        input_type: "INPUT_TYPE_SRT_SOFTWARE",
                        input_module_id: ${serverID},
                        input_stream_id: "",
                        module_name: "MODULE_RESTREAM",
                        entity_name: "Test restream",
                    },
                    output: {
                        output_type: "OUTPUT_TYPE_OTHER_RTMP_URL",
                        output_stream_url : "rtmp://a.rtmp.youtube.com/live2",
                        output_stream_key: ${key},
                        module_name: "MODULE_RESTREAM"
                    },
                    transcoding: {
                        video_transcoding: "mpsoc_vcu_h264",
                        output_video_bitrate: ${bitrate},
                        frame_width: ${width},
                        frame_height: ${height},
                        filter_fps: ${FPS},
                    },
                    active: true
                })
            })
            .then(response => response.json())
            .then((data)=> {
                setRestreamID(data._id);
                alert("Restream Created");
            })
            .catch(()=>{alert("Couldn't Create the Restream")})
    }

            `}
        />
        <Line
            active={restreamID}
            name={'Remove Restream'}
            type={'button'}
            buttonText={'Remove Restream'}
            onClick={removeRestream}
            code={`
    function removeRestream(){
        fetch('http://${IP}/api/restream/remove',
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'x-access-token': token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id: ${restreamID}})
            })
            .then(response => response.json())
            .then(() => {
                setRestreamID(null);
                alert("Restream Removed");
            })
            .catch(()=>{alert("Couldn't Remove the Restream")})
    }
            `}
        />
    </div>
  );
}

export default App;
