import Proptypes from 'prop-types';
import { Fragment } from 'react';

import './GlobalStyles.scss';

const GlobalStyles = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};

GlobalStyles.propTypes = {
    children: Proptypes.node,
};

export default GlobalStyles;
