import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

export default function ReactPlayground() {
    return <div style={{height: '100vh'}}>
        <Header />
        {/*
            Allotment组件通过position设置absolute，拖动改变width
            defaultSizes按照比例展示
            minSize代表最小宽度（px）
        */}
        <Allotment defaultSizes={[100, 100]}>
            <Allotment.Pane minSize={500}>
                <CodeEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={0}>
                <Preview />
            </Allotment.Pane>
        </Allotment>
    </div>
}