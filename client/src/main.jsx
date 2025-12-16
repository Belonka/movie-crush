
import { createRoot } from 'react-dom/client'
import './assets/_base.scss'
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GenresProvider } from './context/GenresContext.jsx';
import { MoviesProvider } from './context/MoviesContext.jsx';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}> 
  <GenresProvider>
   <BrowserRouter>
   <MoviesProvider>
      <App />
      </MoviesProvider>
      </BrowserRouter>
      </GenresProvider>
  </ApolloProvider>
)
