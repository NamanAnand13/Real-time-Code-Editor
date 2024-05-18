import React, { useEffect } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
    async function init() {
        Codemirror.fromTextArea(document.getElementById('realTimeEditor'), {
            mode: { name: 'javascript', json: true },
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
        })
    }
    useEffect(() => {
        init();
    }, []);
    return <textarea id='realTimeEditor'></textarea>;

}

export default Editor;