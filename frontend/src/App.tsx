import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { AuthProvider } from './contexts/auth'; // Importe o AuthProvider

function App() {
  return (
    <AuthProvider> {/* Envolva toda a aplicação */}
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;