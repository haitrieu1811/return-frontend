import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import IntlProviderWrapper from './components/IntlProviderWrapper';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
import { ToastContainer } from 'react-toastify';

import { ConfigProvider } from 'antd';

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={reduxStore}>
        <IntlProviderWrapper>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#6a5af9',
                    },

                    components: {
                        Modal: {
                            colorBgElevated: 'var(--white-color)',
                            colorTextHeading: 'var(--black-color)',
                        },

                        Select: {
                            colorBgContainer: 'transparent',
                            colorText: 'var(--text-color)',
                            colorBorder: 'var(--border-color)',
                            colorBgElevated: 'var(--wrapper-color)',
                            colorTextPlaceholder: 'var(--text-color)',
                        },

                        Checkbox: {
                            colorText: 'var(--text-color)',
                        },

                        Input: {
                            colorBgContainer: 'var(--white-color)',
                            colorText: 'var(--text-color)',
                            colorTextDisabled: 'var(--text-color)',
                            colorBorder: 'var(--border-color)',
                        },
                    },
                }}
            >
                <GlobalStyles>
                    <App persistor={persistor} />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        style={{ zIndex: 99999 }}
                    />
                </GlobalStyles>
            </ConfigProvider>
        </IntlProviderWrapper>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
