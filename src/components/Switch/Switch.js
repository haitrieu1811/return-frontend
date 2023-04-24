import { Switch } from 'antd';

const App = ({ size, onChange, checked }) => {
    return <Switch defaultChecked onChange={onChange} size={size} checked={checked} />;
};

export default App;
