import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  appearance: none;
  border-radius: 0.5rem;
  border: 1px solid ${props => (props.error ? "#ff7676" : "#ccc")};
  padding: 1em;
  font-size: 1.4rem;
  background: ${props => (props.error ? "#ffebeb" : "#f5f5f5")};
`

export default Input;