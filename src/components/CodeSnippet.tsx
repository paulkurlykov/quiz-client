import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {ReactNode} from "react";

function CodeSnippet({children}: {children: string}) {

    return (
        <div className="custom-codeblock" >
        <SyntaxHighlighter 
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers={true}
        >
      {children}
    </SyntaxHighlighter>
        </div>
    )
}

export default CodeSnippet;