# 只需要维护JSON数据、定义不同类型完成表单自动生成

```bash
export const answerInfoList = [
 {
  id: "A1",
  type: 'radio',
  title: '您的生活乐趣今年增加了么',
  actions: [{
    parent: "A1",
    id: '1',
    name: '大幅增加',
    disabled: false
   },
   {
    parent: "A1",
    id: '2',
    name: '增加',
    disabled: false
   },
   {
    parent: "A1",
    id: '3',
    name: '不变',
    disabled: false
   },
   {
    parent: "A1",
    id: '4',
    name: '减少',
    disabled: false
   },
   {
    parent: "A1",
    id: '5',
    name: '大幅减少',
    disabled: false
   }
  ]
 }
]


```
