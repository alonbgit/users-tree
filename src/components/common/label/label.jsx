import PropTypes from 'prop-types';
import classNames from 'classnames';

import './label.scss';

const Label = ({ title, children, className }) => (
    <label className={classNames('label', className)}>
        <span className='label__title'>{title}</span>
        {children}
    </label>
)

Label.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
}

Label.defaultProps = {
    children: null,
    className: '',
}

export default Label;