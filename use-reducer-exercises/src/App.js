
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import QuestionBank2 from './components/QuestionBank2';
import RegisterForm from './components/RegisterForm';
function App() {
  return (
    <div>
      <CounterComponent />
      <LightSwitch />
      <QuestionBank />
      <LoginForm />
      <LoginForm2 />
      <RegisterForm />
      <QuestionBank2 />
    </div>
  );
}

export default App;
