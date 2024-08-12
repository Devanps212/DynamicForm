import DynamicForm from './form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const formConfig = [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    validation: { required: true, minLength: 3 }
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    validation: { required: true }
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    validation: { required: true, minLength: 6 }
  }
];

function App() {
  return (
    <div className="App container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">Dynamic Form</h1>
      <DynamicForm config={formConfig} />
    </div>
  );
}

export default App;