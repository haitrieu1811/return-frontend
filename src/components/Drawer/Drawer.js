import { Drawer } from 'antd';

const App = ({ open, title, placement, onClose, size, width, children }) => {
    // const showDrawer = () => {
    //     setOpen(true);
    // };

    // const onClose = () => {
    //     setOpen(false);
    // };

    return (
        <Drawer title={title} placement={placement} onClose={onClose} open={open} size={size} width={width}>
            {children}
        </Drawer>
    );
};

export default App;
