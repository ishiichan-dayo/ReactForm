import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, useLocation } from 'react-router-dom';

import Submit from '../components/Form/Submit';

import { Br, Section, SectionInner, SectionTitle, FormButton } from './Top';

function Confirm(props) {
  useEffect(() => {
    document.title = `入力内容の確認`;
  });

  const location = useLocation();
  // フォーム入力情報オブジェクトの有無による分岐
  const values = location.state && props.location.state.values;

  // 入力内容修正時の処理
  const returnRetentionState = () => {
    props.history.push({
      pathname: '/',
      state: { values: values }
    })
  }
  // 送信時の処理
  const submitRetentionState = (e) => {
    e.preventDefault();

    props.history.push({
      pathname: '/thanks',
      state: { values: values }
    })
  }

  return (
    <>
    {
      // state内にvaluesオブジェクトがなければ入力画面にリダイレクトさせる
      typeof values === "undefined" && <Redirect to="/" />
    }
    <Section>
      <SectionInner>
        <SectionTitle>以下の内容で<Br show="sp"/>送信してもよろしいですか？</SectionTitle>
        <form onSubmit={submitRetentionState}>
          <ListItem>
            <ListName>氏名</ListName>
            <ListContent>{ values?.['lastName'] + values?.['firstName'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>ふりがな</ListName>
            <ListContent>{ values?.['lastNameKana'] + values?.['firstNameKana'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>社名</ListName>
            <ListContent>{ values?.['companyName'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>メールアドレス</ListName>
            <ListContent>{ values?.['email'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>郵便番号</ListName>
            <ListContent>{ values?.['postalCode'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>住所</ListName>
            <ListContent>{ values?.['address'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>電話番号</ListName>
            <ListContent>{ values?.['tel'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>どの製品について</ListName>
            <ListContent>{ values?.['whichProduct'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>お問い合わせ件名</ListName>
            <ListContent>{ values?.['subject'] }</ListContent>
          </ListItem>
          <ListItem>
            <ListName>お問い合わせ内容</ListName>
            <ListContent>{ values?.['body'] }</ListContent>
          </ListItem>

          <FormButton>
            <Submit type="submit" value="送信する"/>
            <ReturnLink type="button" onClick={returnRetentionState}>入力情報を修正する</ReturnLink>
          </FormButton>
        </form>
      </SectionInner>
    </Section>
    </>
  );
}

const ListItem = styled.div`
  display: flex;
  padding-bottom: 1.5em;
  border-bottom: 1px solid #dadada;
  & + & {
    margin-top: 1.5em;
  }
  @media (max-width: 768px) {
    display: block;
    padding-bottom: 1em;
    & + & {
      margin-top: 1em;
    }
  }
`
const ListName = styled.div`
  min-width: 25%;
  text-align: right;
  padding-right: 2em;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 0;
    margin-bottom: 1em;
  }
`
const ListContent = styled.div`
  min-width: 75%;
  padding-left: 2em;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 1em;
  }
`
const ReturnLink = styled.button`
  font-size: 1.2rem;
  text-decoration: underline;
  text-align: center;
  margin-top: 4em;
  padding: 0;
  appearance: none;
  border: none;
  background: none;
  transition: .3s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export default Confirm;
