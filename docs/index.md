---
hero:
  title: weui-react-v2
  desc: 基于`react`的`weui`组件
  actions:
    - text: 开始
      link: /components/common/button
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 尺寸优化
    desc: 支持树摇，按需打包
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 主题样式
    desc: 支持引入less文件，覆盖主题样式
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 接口友好
    desc: 大部分接口兼容antd设计
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

## 使用指南

### 安装

```bash
yarn add weui-react-v2
```

### 使用

`weui-react-v2`无缝贴合`umi`生态，在`umi`项目中直接运行就支持树摇，不用显示引入样式，非常方便。而且可基于`umi`的主题配置定义主题样式.

> Tips: 请注意，此库组件基于 750px 设计稿, 请使用`post-css`等后处理起，将此库的`px`转换为`rem`或`vw`， 具体看你自己的适配方案. 我个人推荐使用`vw`方案, 以下文旦也都是基于此方案，需要安装开发依赖`postcss-px-to-viewport`

```ts
// umi配置
import { defineConfig } from 'umi';
var pxtoviewport = require('postcss-px-to-viewport');

export default defineConfig({
  // 【可选】 自定义主题色
  theme: {
    '@primary-color': '#CDDC39',
  },
  // 推荐使用`postcss-px-to-viewport`将`px`单位转换为`vw`, 设计稿基于`750px`
  extraPostCSSPlugins: [
    pxtoviewport({
      viewportWidth: 750,
      viewportHeight: 4925,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/dumi/],
    }),
  ],
  routes: [{ path: '/', component: '@/pages/index' }],
});
```

在非`umi`项目中, 也只需要配置`less-loader`的`modifyVars`选项，也能换肤.

```js
{
  module: {
    rules: [
      test: /\.less$/,
      loaders: [
        "style-loader",
        "css-loader",
        {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  "@primary-color": "#CDDC39",
                },
              },
            },
          },
      ]
    ]
  }
}
```

## 路线图

### 从需求出发

目的是打造一套轻快上手的移动端组件，组件样式参照`weui`最新规范。

- [x] 轻便，去除非常复杂的功能，只保留经常用的功能
- [x] 使用 umi-hd 的 rem 方案
- [x] 可覆盖的主题风格, 编译 bundle.css 和直接引入.less 同时支持
- [x] 易于使用的 api
- [x] 组件的动效清爽
- [x] 支持树摇
- [x] 触摸友好, 支持多手势操作
- [ ] 每个组件编写测试和文档

## 组件

### 通用

- [x] `Button` 按钮

### 数据输入

- [x] `Form` 表单组件。提供封装`label`宽度和验证，onSubmit 等功能。
- [x] `FormItem` 可以包裹表单组件
- [x] `Input` 输入框， 支持多种类型，比如手机号，身份证，银行卡的格式化
- [x] `TextArea` 文本域
- [x] `NumberInput` 数值输入框
- [x] `Checkbox` 复选框
- [x] `Switch` 切换开关
- [x] `Upload` 图片上传
- [x] `Picker` 选择器
- [x] `DatePicker` 日期选择
- [x] `Rate`评级
- [x] `AmountKeyboard` 金额键盘
- [x] `PromptDialog` 输入对话框

### 布局

- [x] `Flex` 弹性布局
- [x] `WingBlank` 两翼留白
- [x] `WhiteSpace` 上下留白
- [x] `SafeArea` 安全空间

### 导航

- [x] `Tabs` , 滑动基于`swiper`
- [x] `SearchBar` 搜索栏
- [x] `SegmentedControl` 分段器

### 数据展示

- [x] `List` 列表
- [x] `Panel` 面板
- [x] `Grid` 九宫格
- [x] `Preview` 表单预览
- [x] `ImageView` 图片预览

### 操作反馈

- [x] `ActionSheet` 弹出式菜单
- [x] `Model` 模态对话框
- [x] `HalfScreenDialog` 半屏对话框
- [x] `Toast` 轻提示
- [x] `Toptips` 顶部提示
- [x] `Spin` 加载中
- [x] `Loading` 加载中
- [x] `loadmore` 加载更多
- [x] `Skeleton` 骨架屏
- [x] `SwiperAction` 滑动操作
- [x] `Swiper` 轮播
- [x] `PullRefresh` 上滑加载，下拉刷新
- [x] `Gallery` 图片查看器
