import { useState } from 'react';
import appConfig from './config/app';
import { app } from '@tauri-apps/api';
import { Command } from '@tauri-apps/api/shell';

async function execute(...args) {
  const output = await new Command(...args).execute();

  return output;
}

function App() {
  const [code, setCode] = useState("ls")
  const [output, setOutput] = useState('con meo to');

  const runCode = function () {
    execute(code)
      .then(result => setOutput(result.stdout))
      .catch(error => console.log('error', error))
  }
  //setOutput(result);

  return (
    <div className="min-h-screen grid grid-cols-2 bg-gray-500 divide-x-2 divide-gray-800">
      <div class="p-5">
        <button onClick={runCode} className="border bg-red-500">Execute</button>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full h-full bg-gray-500 focus:outline-none" />
      </div>

      <div className="result p-5">
        <pre>
          {output}
        </pre>
      </div>
    </div>
  );
}

export default App;
