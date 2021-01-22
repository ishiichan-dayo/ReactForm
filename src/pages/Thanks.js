import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Redirect, useLocation } from 'react-router-dom';

import { Br, Section, SectionInner, SectionTitle, FormButton  } from './Top';

function Thanks(props) {
  useEffect(() => {
    document.title = `お問い合わせありがとうございます`;
  });

  const location = useLocation();
  // フォーム入力情報オブジェクトの有無による分岐
  const values = location.state && props.location.state.values;

  console.log(values);

  return (
    <>
    {
      // state内にvaluesオブジェクトがなければ入力画面にリダイレクトさせる
      typeof values === "undefined" ? <Redirect to="/" /> : delete props.location.state.values
    }
    <Section>
      <SectionInner>
        <SectionTitle>お問い合わせ<Br show="sp"/>ありがとうございます</SectionTitle>
        <FormButton><ThanksButton to="/">フォームに戻る</ThanksButton></FormButton>
      </SectionInner>
    </Section>
    </>
  );
}

const ThanksButton = styled(Link)`
  text-align: center;
`

export default Thanks;
