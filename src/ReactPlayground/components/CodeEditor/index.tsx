import Editor from "./Editor";
import FileNameList from "./FileNameList";

export default function CodeEditor() {
    const file = {
        name: 'h.tsx',
        value: 'import lodash from "lodash"; \n\nconst a = <div>h</div>',
        language: 'typescript'
    }

    function onEditorChange() {
    }

    return <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
        <FileNameList />
        <Editor file={file} onChange={onEditorChange} />
    </div>
}