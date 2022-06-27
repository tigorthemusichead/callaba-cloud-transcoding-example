import {useState} from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function Line(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className={'line'}>
            {!props.active && <div className={'inactive'}></div>}
            <div className={'input'}>
                <p>{props.name}</p>
                {{
                    'input': <input type="text" placeholder={props.placeholder} onChange={props.onChange}/>,
                    'button': <button onClick={props.onClick}>{props.buttonText}</button>
                }[props.type]}
            </div>
            {props.code && open && <SyntaxHighlighter
                language="javascript"
                style={docco}
                className={'code'}
            >
                {props.code}
            </SyntaxHighlighter>}
            {props.code && <div className={'toggler'}
                 style={{color: open? '#8C5353': '#2d6c21'}}
                 onClick={()=>{setOpen(!open)}}
            >{
                open ? 'Close' : 'Open'
            }</div>}
        </div>
    );
}

export default Line;