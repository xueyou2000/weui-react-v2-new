/**
 * title: 表单验证
 * desc: 表单验证非常自然，挂接了原生的表单
 */
import { FormMethods } from '@/Form/hooks/useFormMethods';
import { ValidateConfig } from '@/Form/utils/validate';
import { PhoneOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import {
  Input,
  NumberInput,
  Button,
  Flex,
  WhiteSpace,
  List,
  Form,
  FormItem,
  Checkbox,
  SubmitButton,
  useField,
} from 'weui-react-v2';
import './index.less';

interface Model {
  phone: string;
  vcode: string;
  name: string;
  loginType: string;
  age: number;
  amount: number;
}

const validConfig: ValidateConfig<Model> = {
  phone: [{ name: 'Required' }, { name: 'Pattern', params: [/^1\d{10}$/] }],
  vcode: [{ name: 'Required' }, { name: 'EqualLength', params: [6] }],
  name: [{ name: 'Required' }],
  age: [{ name: 'Required' }],
  amount: [{ name: 'Required' }, { name: 'Amount' }],
  loginType: [{ name: 'Required' }],
};

export default function () {
  const formMethods = useRef<FormMethods | null>(null);

  function subamit(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  return (
    <div className="form-demo">
      <div className="form-text-area">
        <div className="form-title">表单结构</div>
        <div className="form-desc">
          展示表单页面的信息结构样式, 分别由头部区域/控件区域/提示区域/操作区域和底部信息区域组成。
        </div>
      </div>
      <Form
        labelWidth="20vw"
        validConfig={validConfig}
        getFormMethods={(methods) => (formMethods.current = methods)}
        onSubmit={subamit}
      >
        <div className="form-margin">
          <List title="表单组标题">
            <FormItem prop="phone" label="手机号">
              <Input placeholder="请输入手机号" type="phone" pattern="[0-9]*" maxlength={13} autoFocus={true} />
            </FormItem>
            <FormItem prop="vcode" label="验证码" extra={<Button size="small">获取验证码</Button>}>
              <Input placeholder="请输入验证码" pattern="[0-9]*" maxlength={6} />
            </FormItem>
            <FormItem prop="name" label="姓名">
              <Input placeholder="请输入真实姓名" maxlength={10} />
            </FormItem>
            <FormItem prop="age" label="年龄" defaultValue={22}>
              <NumberInput
                style={{ width: '50%' }}
                min={1}
                max={120}
                maxlength={3}
                pattern="[0-9]*"
                showControl={true}
              />
            </FormItem>
            <FormItem prop="amount" label="金额">
              <NumberInput type="amount" placeholder="请输入金额" precision={2} />
            </FormItem>
          </List>
          <List title="原生选择框">
            <FormItem prop="loginType" defaultValue="2" arrow="horizontal">
              <select>
                <option value="">不选</option>
                <option value="1">微信号</option>
                <option value="2">QQ号</option>
                <option value="3">Email</option>
              </select>
            </FormItem>
            <FormItem
              className="virtual-select"
              label={
                <FormItem prop="zoneCode" labelString="区号" simple={true} defaultValue="86">
                  <select>
                    <option value="86">+86</option>
                    <option value="80">+80</option>
                    <option value="87">+87</option>
                  </select>
                </FormItem>
              }
            >
              <FormItem prop="zonePhone" labelString="区域手机号" simple={true}>
                <Input placeholder="请输入手机号" type="phone" pattern="[0-9]*" maxlength={13} />
              </FormItem>
            </FormItem>
            <FormItem prop="country" label="国家" arrow="horizontal" defaultValue="2">
              <select>
                <option value="1">中国</option>
                <option value="2">美国</option>
                <option value="3">英国</option>
              </select>
            </FormItem>
          </List>
        </div>
        <div className="form-tips">
          <Checkbox size="small">
            阅读并同意<a>《相关条款》</a>
          </Checkbox>
        </div>
        <div className="form-btns">
          <SubmitButton size="large">确定</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
