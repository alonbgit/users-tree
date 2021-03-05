import classNames from 'classnames';
import PropTypes from 'prop-types';
import Header from './header/header';

import './layout.scss';

const Layout = ({ children, className, username }) => (
    <div className={classNames('layout', className)}>
        <Header username={username} />
        {children}
    </div>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    username: PropTypes.string.isRequired,
}

Layout.defaultProps = {
    className: '',
}

export default Layout;