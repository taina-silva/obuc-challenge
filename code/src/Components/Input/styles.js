import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field';

export const Container = styled.div`
    width: 50%;

    @media (max-width: 750px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const InputContainer = styled.div`
    width: 100%;
`;

export const InputWithButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;

    @media (max-width: 750px) {
        justify-content: space-between;
    }
`;

export const ItemsRow = styled.div`
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

export const ItemContainer = styled.div`
    width: 350px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.25rem 0.25rem 1rem;
    margin: 1rem 1rem 0 0;
    color: black;
    background-color: #fed6d8;
    border-radius: 50px;
    border: none;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, #fed6d8 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
`;

export const CustomCurrencyInput = styled(CurrencyInput)`
    width: 70%;
    font-size: 1.25rem;
    color: black;
    padding: 0.5rem;
    border: 1px solid ${props => (props.showError ? 'red' : '#76b5c5')};
    border-radius: 5px;
    &::placeholder {
        color: #76b5c5;
    }

    @media (max-width: 750px) {
        width: 80%;
    }
`;

export const FormInput = styled.input`
    width: 70%;
    color: black;    
    font-size: 1.25rem;
    padding: 0.5rem;
    border: 1px solid ${props => (props.showError ? 'red' : '#76b5c5')};
    border-radius: 5px;
    &::placeholder {
        color: #76b5c5;
    }

    @media (max-width: 750px) {
        width: 80%;
    }
`;

export const InputTitle = styled.div`
    width: 100%;
    font-size: 1.5rem;
    color: #063970;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const ErrorSpan = styled.div`
    display: ${props => (props.showError ? 'block' : 'none')};
    width: 17.5rem;
    height: 1.5rem;
    margin-top: 10px;
    font-size: 0.75rem;
    color: grey;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const AddRemoveButton = styled.button`
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    background-color: #405cf5;
    border-radius: 100px;
    border: none;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    &:hover {
        background-color: #fff;
        color: #405cf5;
    }
`;

export const Divider = styled.hr`
    width: 80%;
    border-top: 1px solid #405cf5;
    margin-bottom: 2rem;

    @media (max-width: 750px) {
        width: 100%;
    }
`;