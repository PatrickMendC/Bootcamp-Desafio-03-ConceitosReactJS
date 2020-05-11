import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Appointment ${Date.now()}`,
      url: 'http://github.com/BlaBlaBla',
      techs: [
        "Node.js",
        "Express"
      ]
    });

    const repositorys = response.data;

    setRepositories([...repositories, repositorys]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    const repo = repositories.filter(item => item.id !== id);
    setRepositories(repo);
  }

  return (
    <div>
      <button id="addBtn" onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map((reposistory) => {
          return <li key={reposistory.id}>
            {reposistory.title}
            <button onClick={() => handleRemoveRepository(reposistory.id)}>Remover</button>
          </li>
        } )}
      </ul>

      
    </div>
  );
}

export default App;
