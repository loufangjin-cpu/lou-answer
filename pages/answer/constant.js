
/**
 * 类型
 * type: input \ checkbox \ select \ radio \等等
 */

export const selectActionsName = {
	id: "A6",
	type: 'input',
	title:'姓名',
}
export const selectActionsPhone = {
	id: "A7",
	type: 'input',
	title:'联系方式',
}

export const selectActionsA = {
	id: "A",
	type: 'radio',
	title: '您是否在北京？（单选）',
	actions: [{
			parent: "A",
			id: '1',
			name: '是',
			disabled: false
		},
		{
			parent: "A",
			id: '2',
			name: '否（终止调查）',
			disabled: false
		}
	]
}
export const selectActionsA1 = {
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

export const selectActionsA2 = {
	id: "A2",
	type: 'radio',
	title: '您收入来源是？（单选）',
	otherValue:'',
	actions: [{
			parent: "A2",
			id: '1',
			name: '工资性收入 ',
			disabled: false
		},
		{
			parent: "A2",
			id: '2',
			name: '理财收入',
			disabled: false
		},
		{
			parent: "A2",
			id: '3',
			name: '财产性收入',
			disabled: false
		},{
			parent: "A2",
			id: '4',
			name: '其他，请注明',
			disabled: false,
			otherValue: ''
		}
	]
}
export const selectActionsA3 = {
	id: "A3",
	type: 'radio',
	title: '您的生活乐趣每周次数情况',
	actions: [{
			parent: "A3",
			id: '1',
			name: '大幅增加',
			disabled: false
		},
		{
			parent: "A3",
			id: '2',
			name: '增加',
			disabled: false
		},
		{
			parent: "A3",
			id: '3',
			name: '不变',
			disabled: false
		},
		{
			parent: "A3",
			id: '4',
			name: '减少',
			disabled: false
		},
		{
			parent: "A3",
			id: '5',
			name: '大幅减少',
			disabled: false
		}
	]
}
export const selectActionsA4 = {
	id: "A5",
	type: 'radio',
	title: '您今年购买国生活乐趣么？',
	actions: [{
			parent: "A5",
			id: '1',
			name: '已购买',
			disabled: false
		},
		{
			parent: "A5",
			id: '2',
			name: '未购买',
			disabled: false
		},
		{
			parent: "A5",
			id: '3',
			name: '打算购买',
			disabled: false
		},
		{
			parent: "A5",
			id: '4',
			name: '不打算购买',
			disabled: false
		}
	]
}

// 调查问卷总列表
export const answerInfoList = [
	selectActionsA,
	selectActionsA1,
	selectActionsA2,
	selectActionsA3,
	selectActionsA4,
	selectActionsName,
	selectActionsPhone
]

// ! 常量数据
export const titleInfo = {
	title: '尊敬的女士/先生：',
	content: '您好！我们在做一个可爱的调查信息，请您放心作答，感谢您的配合！'
}
