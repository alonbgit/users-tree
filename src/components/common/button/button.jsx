import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.scss';

const Button = (props) => {
    const { onClick, children, className, isDisabled } = props;
    return (
        <button
            type='button'
            className={classNames('button', { 'button--disabled': isDisabled }, className)}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
}

Button.defaultProps = {
    className: '',
    isDisabled: false,
}

export default Button;