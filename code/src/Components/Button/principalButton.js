import React from 'react';
import PropTypes from 'prop-types';
import {
    Button
} from './styles';

function PrincipalButton(props) {
    return (
      <Button type='submit' onClick={props.onClick} >{props.text}</Button>
    );
}

PrincipalButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PrincipalButton;
