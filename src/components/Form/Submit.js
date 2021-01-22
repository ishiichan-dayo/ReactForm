import styled from 'styled-components';

const Submit = styled.input`
  width: 100%;
  appearance: none;
  border-radius: 0.5rem;
  border: 1px solid #333;
  padding: 1em;
  font-size: 1.6rem;
  font-weight: bold;
  background: #333;
  color: #fff;
  transition: .3s opacity;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`

export default Submit;