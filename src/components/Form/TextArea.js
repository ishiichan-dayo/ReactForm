import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${props => (props.error ? "#ff7676" : "#ccc")};
  padding: 1em;
  font-size: 1.4rem;
  background: ${props => (props.error ? "#ffebeb" : "#f5f5f5")};
  height: calc(1.4rem * 1.2 * 5 + 2em);
  appearance: none;
  resize: none;
  font-family: inherit;
`

export default TextArea;