import MonacoEditor, {EditorProps, OnMount} from '@monaco-editor/react';
import {createATA} from "./ata.ts";
import { editor } from 'monaco-editor';

// 文件信息
export interface EditorFile {
    name: string,
    value: string,
    language: string
}

interface Props {
    file: EditorFile,
    onChange?: EditorProps['onChange'],
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
    const { file, onChange, options } = props;

    // onMount为编辑器加载完的回调
    const handleEditorMount: OnMount = (editor, monaco) => {
        // cmd + j 格式化代码
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run();
        });

        // 设置ts的默认compilerOptions
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve, // 保留jsx原样
            esModuleInterop: true // 编译时自动加上default属性，用于处理commonjs包引入的问题
        });

        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`);
        });

        editor.onDidChangeModelContent(() => {
            ata(editor.getValue());
        })

        ata(editor.getValue());
    }

    return <MonacoEditor
        height='100%'
        path={file.name}
        language={file.language}
        onMount={handleEditorMount}
        onChange={onChange}
        value={file.value}
        options={{
            fontSize: 14,
            scrollBeyondLastLine: false, // 关闭到最后一行之后仍然可以滚动一屏
            minimap: {enabled: false}, // 关闭缩略图
            scrollbar: { // 设置横向纵向滚动条宽度
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6
            },
            ...options
        }}
    />
}