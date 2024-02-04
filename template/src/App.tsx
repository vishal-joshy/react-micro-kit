import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SamplePage from './pages/SamplePage/SamplePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SamplePage />} />
      </Routes>
    </BrowserRouter>
  );
}
