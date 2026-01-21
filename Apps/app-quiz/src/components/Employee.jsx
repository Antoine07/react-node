import { useState, useEffect } from "react";

export default function Employee(props){
    const [status, setStatus] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(()=>{
      setCount(count +1);
    }, [status]);

    return (
      <div>
        <p>Name: {props.name} - role: {props.role}</p>
        <button disabled={count > 2} onClick={() => setStatus(!status)}>Show salary</button>
        {status && <p>{props.salary}</p>}
      </div>
    )
  }