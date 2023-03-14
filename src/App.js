import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { publicRoutes } from './routes';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes &&
                    publicRoutes.length > 0 &&
                    publicRoutes.map((route, index) => {
                        const Page = route.page;
                        const Layout = route.layout;

                        return (
                            <Route
                                index={index}
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
            </Routes>
        </Router>
    );
}

export default App;
