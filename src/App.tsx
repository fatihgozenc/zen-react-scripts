import React from "react";
import logo from "./logo.svg";
import "./styles/main.scss";
import AuditWorker from "./Audit.worker";

function App(): React.ReactElement {
  React.useEffect(() => {
    const w = new AuditWorker();
    w.postMessage("Is worker listening?");
  }, []);
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-700">
      <img src={logo} className="app-logo" alt="logo" />
      <p className="flex text-white">
        Edit <code className="mx-2"> src/App.tsx </code> and save to reload.
      </p>
      <a
        className="text-cyan-500"
        href={process.env["fatih"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <h5 className="bg-gradient-to-r from-cyan-500 to-blue-100 text-transparent text-sm bg-clip-text font-bold">
        created with Create Zen App
      </h5>
    </div>
  );
}

export default App;
