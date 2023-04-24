import { Checkbox } from 'antd';

const CheckboxGroup = ({ options, onChange, defaultValue }) => {
    return <Checkbox.Group options={options} defaultValue={defaultValue} onChange={onChange} />;
};

export default CheckboxGroup;
