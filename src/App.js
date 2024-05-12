import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DumpQuotes from "./Comp/dump";
import Topic from "./Comp/Topic";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DumpQuotes />}  />
          <Route path="/topic/:topic" element={<Topic />}/>
        </Routes>
      </Router>
    </>
  )
}
