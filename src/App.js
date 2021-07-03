import { useState } from 'react';
import appConfig from './config/app';
import { app } from '@tauri-apps/api';
import { Command } from '@tauri-apps/api/shell';

function App() {
  const [code, setCode] = useState("User::where('name', 'daudau')->first()")
  const [output, setOutput] = useState('con meo to');

  const command = new Command('ls -la');

  command.stdout.on('data', line => setOutput(line));
  command.spawn();

  console.log('name daudau')

  return (
    <div className="min-h-screen grid grid-cols-2 bg-gray-500 divide-x-2 divide-gray-800">
      <div class="p-5">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full h-full bg-gray-500 focus:outline-none" />
      </div>

      <div className="result p-5">
        {output}
      </div>
    </div >
  );
}

export default App;
