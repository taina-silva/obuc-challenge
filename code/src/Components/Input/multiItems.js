import React from 'react';
import PropTypes from 'prop-types';
import {
    Column,
    Row,
    ItemsRow,
    ItemContainer,
    InputTitle,
    ErrorSpan,
    AddRemoveButton,
    Divider
} from './styles';

function MultiItemsInput({title, getFormInput, itemsList, addItem, removeItem, errorDescription}) {
    return (
        <Column>
            <Divider />
            <InputTitle>{title}</InputTitle>
            <Row>
                {getFormInput()}
                <AddRemoveButton type='button' onClick={addItem}>+</AddRemoveButton>
            </Row>                                    
            <ErrorSpan>{errorDescription}</ErrorSpan>
            <ItemsRow>                
                {itemsList.map((a) => (
                    <ItemContainer key={a}>
                        <p>{a}</p>
                        <AddRemoveButton type='button' onClick={() => removeItem(a)}>-</AddRemoveButton>
                    </ItemContainer>
                ))}
            </ItemsRow>
        </Column>
    );
}

MultiItemsInput.propTypes = {
    title: PropTypes.string.isRequired,
    getFormInput: PropTypes.func.isRequired,
    itemsList: PropTypes.arrayOf(String).isRequired,
    addItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    errorDescription: PropTypes.string.isRequired,
};

export default MultiItemsInput;