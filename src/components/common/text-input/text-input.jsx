import classNames from 'classnames';
import PropTypes from 'prop-types';

import './text-input.scss';

const TextInput = ({ className, value, onChange }) => {
    const onTextChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <input
            type='text'
            className={classNames('text-input', className)}
            value={value}
            onChange={onTextChange}
        />
    );
};

TextInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

TextInput.defaultProps = {
    className: '',
}

export default TextInput;