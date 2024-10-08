import { isAmount, isTailDot, toFixed } from '../utils/number-utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { DefineDefaultValue, useOutsideClick } from 'utils-hooks';
import AmountKeyBoard from '../AmountKeyBoard';
import Input, { InputParser } from '../Input';
import './style';
import { add, checkNumberIntermediate, defaultFormatter, defaultParser, isEmpy, sub, toNumber } from './utils';

export interface NumberInputProps {
  /**
   * 附加类名
   */
  prefixCls?: string;
  /**
   * 根节点的附加类名
   */
  className?: string;
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 值
   */
  value?: number | null;
  /**
   * 默认值
   */
  defaultValue?: number | null;
  /**
   * change回调
   */
  onChange?: (value: number | null) => void;
  /**
   * 占位符文本
   */
  placeholder?: string;
  /**
   * 匹配模式
   */
  pattern?: string;
  /**
   * 自动焦点
   */
  autoFocus?: boolean;
  /**
   * 最大字符长度
   */
  maxlength?: number;
  /**
   * 输入框焦点事件
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /**
   * 输入框失去焦点事件
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /**
   * 前置图标
   */
  prefix?: React.ReactNode;
  /**
   * 后置图标
   */
  suffix?: React.ReactNode;
  /**
   * 输入框展示值的格式化
   */
  formatter?: InputParser;
  /**
   * 从formatter里转换回来, 配合 formatter使用
   */
  parser?: InputParser;
  /**
   * 保留小数点精度
   * @description 为整数, 比如3, 就是保留到小数点3位
   */
  precision?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 步长
   */
  step?: number;
  /**
   * 输入框类型
   */
  type?: 'amount' | 'number';
  /**
   * 是否显示控制按钮
   */
  showControl?: boolean;
}

const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => {
  const {
    prefixCls = 'weui-number-input',
    className,
    style,
    formatter = defaultFormatter,
    parser = defaultParser,
    type = 'number',
    precision = 2,
    max,
    min,
    step = 1,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    showControl,
    ...inputProps
  } = props;
  const inputRef = useRef<HTMLDivElement | null>(null);
  const keyboardRef = useRef<HTMLDivElement | null>(null);
  // 是否受控
  const isControll = 'value' in props;
  // 输入框里的临时字符串
  const [inputValue, setInputValue] = useState<string>(
    getFormatterInputValue(DefineDefaultValue(props, 'value', 'defaultValue')),
  );
  const [number, setNumber] = useState<number | null>(DefineDefaultValue(props, 'value', 'defaultValue') || null);
  // 记录最后一次输入正确的内容
  const lastRef = useRef<number | null | undefined>(toNumber(inputValue));
  const [focus, setFocus] = useState(false);

  /**
   * 改变数值
   */
  function changeNumber(val: string) {
    let fmtStr = getNumberString(val);
    // 清空输入框时候值是null, 无效数值时值是undefined
    let number = toNumber(toFixed(fmtStr, precision));
    // 输入不正确，则还原成最后一次正确输入
    if (!isEmpy(lastRef.current)) {
      let num: number = number === undefined ? (lastRef.current as number) : number;
      // 钳住最大最小
      if (min !== undefined && num < min) {
        num = min;
      }
      if (max !== undefined && num > max) {
        num = max;
      }
      number = num;
    }

    let nextInputVal = fmtStr === '' ? '' : isEmpy(number) ? '' : getFormatterInputValue(number as number);
    let nextNumber = fmtStr === '' || number === undefined ? null : number;

    setInputValue(nextInputVal);
    setNumber(nextNumber);

    if (onChange) {
      onChange(nextNumber);
    }
    lastRef.current = nextNumber;
  }

  // 受控组件时从外部更新输入框的值
  useEffect(() => {
    if (isControll) {
      var newVal = props.value;
      if (newVal !== lastRef.current) {
        setInputValue(getFormatterInputValue(newVal as any));
      }
      setNumber(isEmpy(newVal) ? null : (newVal as number));
      lastRef.current = newVal;
    }
  }, [props.value]);

  /**
   * 获取金额字符串
   */
  function getNumberString(val: number | string) {
    return parser(isEmpy(val) ? '' : val + '');
  }

  /**
   * 获取格式化后的金额字符串
   */
  function getFormatterInputValue(val: number | string) {
    const numberString = getNumberString(val);
    return formatter(isEmpy(numberString) ? '' : numberString + '');
  }

  function getLastNumber() {
    return (
      toNumber(getNumberString(lastRef.current === null || lastRef.current === undefined ? '' : lastRef.current)) || 0
    );
  }

  function canIncrease() {
    const numberValue = getLastNumber();
    if (max !== undefined && numberValue !== undefined) {
      return numberValue < max;
    } else {
      return true;
    }
  }

  function canDecrease() {
    const numberValue = getLastNumber();
    if (min !== undefined && numberValue !== undefined) {
      return numberValue > min;
    } else {
      return true;
    }
  }

  function increase() {
    if (!canIncrease() || inputProps.disabled) {
      return;
    }
    const numberValue = getLastNumber();
    let next: number;
    if (max !== undefined) {
      if (add(numberValue, step) > max) {
        next = max;
      } else {
        next = add(numberValue, step);
      }
    } else {
      next = add(numberValue, step);
    }
    changeNumber(next + '');
  }

  function decrease() {
    if (!canDecrease() || inputProps.disabled) {
      return;
    }
    const numberValue = getLastNumber();
    let next: number;
    if (min !== undefined) {
      if (sub(numberValue, step) < min) {
        next = min;
      } else {
        next = sub(numberValue, step);
      }
    } else {
      next = sub(numberValue, step);
    }
    changeNumber(next + '');
  }

  function handleChange(val: string) {
    val = getNumberString(val);

    // 1. 有效输入，单无效数值，则不触发changeNumber, 仅更改输入框值. 例如(-), (1.), (0.0), (-0.3)
    if (checkNumberIntermediate(val, precision)) {
      setInputValue(getFormatterInputValue(val));
    } else if (!val || isAmount(val, precision)) {
      // 2. 将非法输入通过正则优化掉
      changeNumber(val);
    }
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    // 如果结尾是小数点，则移除小数点
    if (inputValue && isTailDot(inputValue)) {
      setInputValue(toFixed(inputValue as any, 0));
    }
    if (onBlur) {
      onBlur(event);
    }
  }

  function handleKeyBardChange(amount: number, amountStr: string) {
    lastRef.current = amount;
    if (onChange) {
      onChange(amount);
    }
    setNumber(amount);
    setInputValue(amountStr);
  }

  useOutsideClick([inputRef.current, keyboardRef.current] as any, () => {
    setFocus(false);
  });

  useEffect(() => {
    if (type === 'amount' && props.autoFocus) {
      setFocus(true);
    }
  }, []);

  useEffect(() => {
    const input = inputRef.current as HTMLInputElement;
    if (type === 'amount' && input && focus) {
      input.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [focus]);

  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: inputProps.disabled,
        [`${prefixCls}-show-control`]: showControl,
      })}
      style={style}
      ref={ref}
    >
      {showControl && (
        <span
          className={classNames(`${prefixCls}-control control-down`, {
            disabled: inputProps.disabled || !canDecrease(),
          })}
          onClick={decrease}
        >
          <MinusOutlined />
        </span>
      )}

      <Input
        {...inputProps}
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        readOnly={type === 'amount'}
        clearable={false}
      />
      {showControl && (
        <span
          className={classNames(`${prefixCls}-control control-up`, { disabled: inputProps.disabled || !canIncrease() })}
          onClick={increase}
        >
          <PlusOutlined />
        </span>
      )}

      {type === 'amount' && (
        <AmountKeyBoard
          ref={keyboardRef}
          value={number || 0}
          precision={precision}
          visible={focus}
          onVisibleChange={setFocus}
          onChange={handleKeyBardChange}
        />
      )}
    </div>
  );
});

export default React.memo(NumberInput);
