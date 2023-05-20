import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createClient } from 'urql'
function App() {
  const [tokens , setTokens] = useState();
 const QueryURL = "https://gateway.thegraph.com/api/93364a12f8a38894266fb4965234d98f/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7"
const query =` {
  tokens(first: 5) {
    id
    name
    symbol
    decimals
  }
}`

const client = createClient({
  url:QueryURL
})

useEffect(()=>{
  const getTokens = async ()=>{
    const {data} = await client.query(query).toPromise();
    setTokens(data.tokens);
    console.log(data);
  }
  getTokens();
},[]);

  return (
   <div>
Token information
{
  tokens !=null && tokens.length > 0 && tokens.map(e=>{
    return(
      <div>
        <p>{e.name}</p>
        <p>{e.id}</p>
        </div>
    )
  })
}
   </div>
       
  )
}

export default App
