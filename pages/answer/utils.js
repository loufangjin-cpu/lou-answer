// 数据转换

// 动态设置model
export const fetchModel = (info = {}) => {
	const {id, type} = info
	const enumInfo = {
		'input': '',
		'radio': '',
		'select': '',
		'checkbox': []
	}
	const params = {
		[id]: enumInfo[type]
	}
	return params
}

// 动态设置rules

export const fetchRules = (info) => {
	const otherValue = Object.keys(info).includes('otherValue')
	const special = Object.keys(info).includes('special')
	const message = {
		type: 'string',
		required: true,
		message: '请选择',
		trigger: ['blur', 'change']
	}
	const messageCheckBox = {
		type: 'array',
		max: 3,
		required: true,
		message: '最多选三项',
		trigger: ['change']
	}
	const enumInfo = {
		'input': message,
		'radio': message,
		'select': message,
		'checkbox': messageCheckBox
	}
	const params = {}
	params[info.id] = enumInfo[info.type]
	// 特殊处理， 目前没有找到更好的方式去校验
	// if(info.id === 'C5') return ''
	info?.children?.map((res, index) => {
		const tag = `${info.id}-${index}-content`
		params[tag] = message
	})
	// children存在返回：id-index-content
	if(info?.children) {
		delete params[info.id]
	}
	//  
	if(otherValue) {
		const tag = `${info.id}-otherValue`
		params[tag] = message
	}
	if(special) {
		const tag = `${info.id}-special`
		params[tag] = message
	}
	return params
}

export const getStandardModelInfo = (modelInfo = {}, model) => {
	console.log('info', modelInfo, model)
	let params = {}
	// 场景1: key: ''
	Object.entries(modelInfo).map(([key, value]) => {
		const keyPropertyChain = key.split('-')
		if(keyPropertyChain.length === 1 && value) {
			params = {
				id: model.id,
				title: model.title,
				value: [value]
			}
		} else if (value && keyPropertyChain.length === 2) {
			const [id, otherValue] = keyPropertyChain
			if(otherValue) {
				params.otherValue = value
			}
		} else if(value && keyPropertyChain.length === 3) {
			const [first, second, content] = keyPropertyChain
			const childrenInfo = {
				id: model.children[second].id,
				title: model.children[second].title,
				value: [value]
			}
			params.id = first
			params.title = model.title
			if(params.children) {
				params.children.push(childrenInfo)
			} else {
				params.children = [childrenInfo]
			}
		}
	})
	return params
}