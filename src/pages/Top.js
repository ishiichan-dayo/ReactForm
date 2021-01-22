import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { usePostalJp } from 'use-postal-jp'

import Input from '../components/Form/Input';
import Checkbox from '../components/Form/Checkbox';
import Select from '../components/Form/Select';
import TextArea from '../components/Form/TextArea';
import Submit from '../components/Form/Submit';

import { useForm } from "react-hook-form";

function Top(props) {
  useEffect(() => {
    document.title = `お問い合わせ`;
  });

  // フォーム入力情報オブジェクトの有無による分岐
  const location = useLocation();
  const stateValues = location.state && props.location.state.values;

  const { register, handleSubmit, errors, watch, getValues, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: stateValues
  });

  // 個人情報のお取り扱いについて同意のチェック状態を監視
  const watchAccept = watch('accept');

  // 郵便番号を監視
  const watchPostalCode = watch('postalCode');

  // ひらがな正規表現
  const kanaRegex = /^[ぁ-んー　]+$/i;
  // メールアドレス正規表現
  const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  // 郵便番号入力で住所を自動入力
  const { address, setPostalCode } = usePostalJp()
  useEffect(() => {
    setPostalCode(watchPostalCode)
  })
  const autoInputAddress = () => {
    return !Object.keys(address).length ? '' : setValue("address", address.prefecture + address.address1 + address.address2 + address.address3 + address.address4)
  }

  // 送信時の処理
  const onSubmit = (data, e) => {
    e.preventDefault();

    // /confirm に入力内容を渡す
    props.history.push({
      pathname: '/confirm',
      state: { values: getValues() }
    })
  };

  return (
    <Section>
      <SectionInner>
        <SectionTitle>お問い合わせ</SectionTitle>
        <form noValidate onSubmit={ handleSubmit(onSubmit) }>
          <FormRow>
            <FormName>氏名<FormRabel>必須</FormRabel></FormName>
            <FormInput>
              <InputGroup>
                <InputGroupItem>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="姓"
                    error={errors.lastName}
                    ref={register({
                      required: true
                    })}
                  />
                </InputGroupItem>
                <InputGroupItem>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="名"
                    error={errors.firstName}
                    ref={register({
                      required: true
                    })}
                  />
                </InputGroupItem>
              </InputGroup>
              { errors.lastName && <FormError>姓 を入力してください</FormError> }
              { errors.firstName && <FormError>名 を入力してください</FormError> }
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>ふりがな<FormRabel>必須</FormRabel></FormName>
            <FormInput>
              <InputGroup>
                <InputGroupItem>
                  <Input
                    type="text"
                    name="lastNameKana"
                    placeholder="せい"
                    error={errors.lastNameKana}
                    ref={register({
                      required: true,
                      pattern: {
                        value: kanaRegex
                      }
                    })}
                  />
                </InputGroupItem>
                <InputGroupItem>
                  <Input
                    type="text"
                    name="firstNameKana"
                    placeholder="めい"
                    error={errors.firstNameKana}
                    ref={register({
                      required: true,
                      pattern: {
                        value: kanaRegex
                      }
                    })}
                  />
                </InputGroupItem>
              </InputGroup>
              { errors.lastNameKana?.type === "required" && <FormError>せい を入力してください</FormError> }
              { errors.firstNameKana?.type === "required" && <FormError>めい を入力してください</FormError> }
              { errors.lastNameKana?.type === "pattern" || errors.firstNameKana?.type === "pattern" ? <FormError>ひらがなで入力してください</FormError> : "" }
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>社名</FormName>
            <FormInput>
              <Input
                type="text"
                name="companyName"
                placeholder="社名"
                ref={register}
              />
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>メールアドレス<FormRabel>必須</FormRabel></FormName>
            <FormInput>
              <Input
                type="email"
                name="email"
                placeholder="メールアドレス"
                error={errors.email}
                ref={register({
                  required: true,
                  pattern: {
                    value: mailRegex
                  }
                })}
              />
              { errors.email?.type === "required" && <FormError>メールアドレス を入力してください</FormError> }
              { errors.email?.type === "pattern" && <FormError>メールアドレスの形式で入力されていません</FormError> }
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>郵便番号</FormName>
            <FormInput>
              <InputGroup>
                <InputGroupItem>
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="郵便番号"
                    ref={register}
                  />
                </InputGroupItem>
                <InputGroupItem>
                  <AutoInputButton type="button" onClick={autoInputAddress}>住所自動入力</AutoInputButton>
                </InputGroupItem>
              </InputGroup>
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>住所</FormName>
            <FormInput>
              <Input
                type="text"
                name="address"
                placeholder="住所"
                ref={register}
              />
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>電話番号</FormName>
            <FormInput>
              <InputGroup>
                <InputGroupItem>
                  <Input
                    type="number"
                    name="tel"
                    placeholder="電話番号"
                    ref={register}
                  />
                </InputGroupItem>
              </InputGroup>
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>どの製品について</FormName>
            <FormInput>
              <InputGroup>
                <InputGroupItem>
                  <Select name="whichProduct" ref={register}>
                    <option value="未選択">製品を選択してください</option>
                    <option value="Aサービスについて">Aサービスについて</option>
                    <option value="Bサービスについて">Bサービスについて</option>
                    <option value="Cサービスについて">Cサービスについて</option>
                    <option value="その他">その他</option>
                  </Select>
              </InputGroupItem>
              </InputGroup>
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>お問い合わせ件名<FormRabel>必須</FormRabel></FormName>
            <FormInput>
              <Input
                type="text"
                name="subject"
                placeholder="お問い合わせ件名"
                error={errors.subject}
                ref={register({
                  required: true
                })}
              />
              { errors.subject && <FormError>お問い合わせ件名 を入力してください</FormError> }
            </FormInput>
          </FormRow>

          <FormRow>
            <FormName>お問い合わせ内容<FormRabel>必須</FormRabel></FormName>
            <FormInput>
              <TextArea
                name="body"
                placeholder="お問い合わせ内容"
                error={errors.body}
                ref={register({
                  required: true
                })}
              />
              { errors.body && <FormError>お問い合わせ内容 を入力してください</FormError> }
            </FormInput>
          </FormRow>

          <FormPrivacy>
            <Checkbox
              type="checkbox"
              name="accept"
              id="accept"
              ref={register({
                required: true
              })}
            />
            <label htmlFor="accept"> 個人情報のお取り扱いについて同意する</label>
          </FormPrivacy>

          <FormButton>
            <Submit
              type="submit"
              value="入力内容を確認する"
              disabled={!watchAccept}/>
          </FormButton>

        </form>
      </SectionInner>
    </Section>
  );
}

export const Br = styled.br`
  ${props => {
    if (props.show === "pc") {
      return `
        display: block;
        @media (max-width: 768px) {
          display: none;
        }
      `
    } else if (props.show === "sp") {
        return `
          display: none;
          @media (max-width: 768px) {
            display: block;
          }
        `
      }
    }
  }
`

export const Section = styled.section`
  width: 100%;
  padding: 80px 0;
`

export const SectionInner = styled.div`
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
  padding: 0 15px;
`

export const SectionTitle = styled.h1`
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 60px;
  line-height: 1.4;
`

const FormRabel = styled.span`
  color: #ff7676;
  font-size: 1.2rem;
  display: inline-block;
  padding: 0.2em;
  border: 1px solid #ff7676;
  border-radius: 4px;
`

const FormRow = styled.div`
  & + & {
    margin-top: 35px;
  }
`

const FormName = styled.div`
  font-size: 1.4rem;
  margin-bottom: 0.8em;
  display: flex;
  align-items: center;
  ${FormRabel} {
    margin-left: 1em;
  }
`

const FormInput = styled.div`
`

const AutoInputButton = styled.button`
  padding: 1em;
  appearance: none;
  border: 1px solid #333;
  background: #333;
  color: #fff;
  border-radius: 4px;
  transition: .3s;
  font-size: 1.2rem;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const FormError = styled.p`
  font-size: 1.2rem;
  color: red;
  margin-top: 1em;
`

const FormPrivacy = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin: 40px auto 0;
  width: 100%;
  max-width: 320px;
`

export const FormButton = styled.div`
  margin: 40px auto 0;
  width: 100%;
  max-width: 320px;
  text-align: center;
`

const InputGroup = styled.ul`
  display: flex;
  align-items: center;
  margin: 0 -10px;
`
const InputGroupItem = styled.li`
  width: 50%;
  padding: 0 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default Top;
