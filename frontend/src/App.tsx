
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle} from './styles/global';
import { Router } from './Router';

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter> 
  )
}

export default App
