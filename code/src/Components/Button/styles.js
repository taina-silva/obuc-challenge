import styled from 'styled-components';

export const Button = styled.button`
    padding: 1rem;
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5be4ea;
    border-radius: 15px;
    border: 2px solid #5be4ea;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #ea4e73;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background: #fff;
    }

    @media (min-width: 2560px) {
        width: 20rem;
        font-size: 1.5rem;
    }
`;