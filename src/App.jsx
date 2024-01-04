import { useState, useCallback, useEffect, useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null);

  // Function to generate a password based on the specified criteria
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*-_+=~";
    }

    // Generate the password based on the specified length and criteria
    for (let i = 0; i < length; i++) {
      let charidx = Math.floor(Math.random() * str.length);
      pass += str.charAt(charidx);
    }

    // Update the password state
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //Function to copy the generated password to the clipboard
  const copyPasswordToClipBoard = useCallback(() => {
    // Select the input field
    passwordRef.current.select();

    // Copy the selected text to the clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //I've used useEffect to regenerate the password whenever length, numberAllowed or charAllowed changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-8 py-6 my-8 text-blue-800 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500">
        <h1 className="text-white text-center my-3 font-bold text-3xl">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-white text-blue-800 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="hover:bg-yellow-500 outline-none bg-yellow-400 text-blue-800 px-4 py-1 text-lg shrink-0 cursor-pointer"
          >
            Copy text
          </button>
        </div>

        <div className="flex text-base gap-x-4">

          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer bg-yellow-200"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
