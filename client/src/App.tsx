import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Dashboard from './components/Dashboard';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{height:'100px'}} className="bg-blue-800 text-white">
          <h1 style={{color:'white'}}>Credit Risk Analytics Dashboard</h1>
        </Header>
        <Content className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;