import styled from 'styled-components';

const Input = styled.input`
  + label {
    &:hover {
      cursor: pointer;
    }
  }
`

export default Input;