import { createContext, useContext, useEffect, useState } from "react";

export const FunComponentContext = createContext();
export const useComponentContext = () => useContext(FunComponentContext)

function NewComponent() {
  const [number, setNumber] = useState(null)
  const testInfo = document.querySelector('#old > div')

  useEffect(() => {
      if (testInfo === null) {
          console.log("hello")
      } else {
          setNumber(testInfo.innerHTML)
      }
      console.log(testInfo)

    }, [number, testInfo])

    console.log(number)

    const handleClick = () => {
        testInfo.innerHTML = ""
    }

  return (
<>
    <div className="App">
        <h1>{number ? number : "Select A Number"}</h1>
    </div>
    <button onClick={handleClick} >Clear Number</button>
</>
  );
}

export default NewComponent;
