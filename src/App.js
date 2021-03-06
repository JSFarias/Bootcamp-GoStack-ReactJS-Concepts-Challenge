import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
     api.get('/repositories').then(response => setRepositories(response.data))       
  },[])

  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      title: `Repo ${Date.now()}`
    })

    const repository = response.data
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repo => repo.id !== id))
   
  }

  return (
    <div>
      
      <ul data-testid="repository-list">
        {repositories.map(data => 
          <li key={data.id}>                
            {data.title}
            <button onClick={() => handleRemoveRepository(data.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
