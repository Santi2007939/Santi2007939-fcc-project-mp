import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { faMaximize } from '@fortawesome/free-solid-svg-icons';
import { faMinimize} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { marked } from 'marked';
import './style-sheets/main.css';
import './App.css'

let firstState = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\` javascript
// this is multiply line
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Imagen de programacion](https://pbs.twimg.com/profile_banners/1368319179338772480/1676314052/1500x500)

  `

function App() {

  const [input, setInput] = useState(firstState);
  const [iprev, setIprev] = useState(0);
  const [iedit, setIedit] = useState(0);
  const [respaldo, setRespaldo] = useState(input);

  let iconos = [faMaximize, faMinimize, faMaximize];

  const manejarCambio = e => {
    setInput(e.target.value);
  }

  /*marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false
  });

  // Compile*/
  //console.log(marked.parse('Hola'));

  

  return (
    
    <div className="App">
      <div className={`editor ${iprev == 0 ? 'editor__normal' : iprev == 1 ? 'editor__none' : 'editor__bigger'}`}>
        <div className='editor__header'>
          <div className='editor__header__title'>
          <FontAwesomeIcon icon={faMarkdown} className='editor__header__title__icon' /> Editor
          </div>
          <div className='editor__header__icons'>
            <FontAwesomeIcon icon={faRotateBack} className='editor__header__icons__back' onClick={(e) => {document.getElementById('editor').value=respaldo, setInput(respaldo)}} />
            <FontAwesomeIcon icon={faTrash} className='editor__header__icons__trash' onClick={(e) => {document.getElementById('editor').value=''; setInput('')}} />
            <FontAwesomeIcon icon={iconos[iedit]} className='editor__header__icons__change' onClick={() => {
              if (iedit == 0) {
                setIedit(1);
                setIprev(2);
              } else {
                setIedit(0);
                setIprev(0);
              }
            }}/>
          </div>
        </div>
        <textarea id='editor' className={`editor__text ${iprev == 0 ? 'editor__text__normal' : iprev == 1 ? 'editor__text__none' : 'editor__text__bigger'}`} cols='50' rows='10' onChange={(e) => {setInput(e.target.value); console.log(input); setRespaldo(input)}}>
          {firstState}
        </textarea>
      </div>
      <div className={`previewer ${iedit == 0 ? 'previewer__normal' : iedit == 1 ? 'previewer__none' : 'previewer__bigger'}`}>
        <div className='previewer__header'>
          <div className='previewer__header__title'>
          <FontAwesomeIcon icon={faMarkdown} className='previewer__header__title__icon' /> Previewer
          </div>
          <div className='previewer__header__icons'>
            <FontAwesomeIcon icon={iconos[iprev]} className='previewer__header__icons__change' onClick={() => {
              if (iprev == 0) {
                setIprev(1);
                setIedit(2);
              } else {
                setIedit(0);
                setIprev(0);
              }
            }}/>
          </div>
        </div>
        <div id='preview' className='previewer__result' dangerouslySetInnerHTML={{__html: marked.parse(input, {breaks:true})}}>
          
        </div>
      </div>
    </div>
  )
}

export default App
