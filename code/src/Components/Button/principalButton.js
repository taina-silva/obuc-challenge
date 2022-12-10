import React from 'react';
import {
    Button
} from './styles';

function PrincipalButton({text, onClick}) {
    return (
      <Button onClick={onClick} >{text}</Button>
    );
}

export default PrincipalButton;
