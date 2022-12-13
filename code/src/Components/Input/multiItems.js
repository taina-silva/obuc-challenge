import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    InputWithButton,
    InputContainer,
    ItemsRow,
    ItemContainer,
    InputTitle,
    ErrorSpan,
    AddRemoveButton,
    Divider
} from './styles';

function MultiItemsInput({title, getFormInput, itemsList, addItem, removeItem, errorDescription}) {
    return (
        <Container>
            <Divider />
            <InputContainer>
                <InputTitle>{title}</InputTitle>
                <InputWithButton>
                    {getFormInput()}
                    <AddRemoveButton type='button' onClick={addItem}>+</AddRemoveButton>
                </InputWithButton>  
                    <ErrorSpan showError={errorDescription === undefined}>{errorDescription}</ErrorSpan>
                <ItemsRow>                
                    {itemsList.map((a) => (
                        <ItemContainer key={a}>
                            <p>{a}</p>
                            <AddRemoveButton type='button' onClick={() => removeItem(a)}>-</AddRemoveButton>
                        </ItemContainer>
                    ))}
                </ItemsRow>
            </InputContainer>            
        </Container>
    );
}

MultiItemsInput.propTypes = {
    title: PropTypes.string.isRequired,
    getFormInput: PropTypes.func.isRequired,
    itemsList: PropTypes.arrayOf(String).isRequired,
    addItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    errorDescription: PropTypes.string,
};

export default MultiItemsInput;