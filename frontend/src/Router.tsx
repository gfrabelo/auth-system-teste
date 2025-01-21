import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}