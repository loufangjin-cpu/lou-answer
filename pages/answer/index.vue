<template>
	<view class="main-container">
		<view class="main-title" v-if="currentQuestionIndex === 0 && answerCompleteStatus === 'ready'">
			<view class="main-title-bold">{{titleInfo.title}}</view>
			<view class="indent">{{titleInfo.content}}</view>
		</view>
		<view class="main-content">
			<u--form v-if="answerCompleteStatus === 'ready'" labelPosition="top" labelWidth="auto" labelAlign="left"
				:rules="rules" :model="model1" ref="form1">
				<u-form-item v-for="(item, index) in answerList" labelPosition="top" :label="`${item.id}.${item.title}`"
					:key="item.id" :prop="item.id" borderBottom @click="handleFormClick(item, index)" ref="item1">

					<template v-if="item.type === 'input' && !item.children">
						<u--input v-model="model1[item.id]" disabledColor="#ffffff" border="none"
							placeholder="请输入"></u--input>
					</template>

					<template v-if="item.type === 'select' && !item.children">
						<u--input v-model="model1[item.id]" disabledColor="#ffffff" placeholder="请选择"></u--input>
						<!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
					</template>

					<template v-if="item.type === 'radio' && !item.children">
						<u-radio-group v-model="model1[item.id]" placement="column"
							@change="handleRadio($event, item, index)">
							<u-radio :customStyle="{marginRight: '16px', marginTop: '16px'}"
								v-for="(item1, index1) in item.actions" :key="item1.id" :label="item1.name"
								:name="item1.name">
							</u-radio>
							<u-form-item v-if="item.id === 'C8' &&  model1[item.id] === '线上'"
								:prop="`${item.id}-special`" @click="handleChildSelect(item, index)">
								<u--input v-model="model1[`${item.id}-special`]" :customStyle="{marginTop: '15px'}"
									placeholder="请选择"></u--input>
							</u-form-item>
							<u-form-item v-if="model1[item.id].includes(otherMessageMark)"
								:prop="`${item.id}-otherValue`">
								<u--input v-model="model1[`${item.id}-otherValue`]" :customStyle="{marginTop: '15px'}"
									placeholder="其他,请注明"></u--input>
							</u-form-item>
						</u-radio-group>
					</template>

					<template v-if="item.type === 'checkbox' && !item.children ">
						<u-checkbox-group placement="column" v-model="model1[item.id]" shape="square"
							@change="changeBox($event, item, index)">
							<u-checkbox :customStyle="{marginRight: '16px', marginTop: '16px'}"
								v-for="(item1, index1) in item.actions" :key="index1" :label="item1.name"
								:name="item1.name">
							</u-checkbox>
							<u-form-item v-if="model1[item.id].includes(otherMessageMark)"
								:prop="`${item.id}-otherValue`">
								<u--input v-model="model1[`${item.id}-otherValue`]" :customStyle="{marginTop: '15px'}"
									placeholder="其他,请注明"></u--input>
							</u-form-item>
						</u-checkbox-group>
					</template>

				</u-form-item>
			</u--form>
		</view>
		<u-action-sheet :show="showSex" :actions="actionsList" :safeAreaInsetBottom="true" @close="showSex = false"
			@select="sexSelect">
		</u-action-sheet>
		<u-button v-if="answerCompleteStatus === 'ready'" class="btn-status" type="primary"
			:text="currentBtnStatus ? '提交' : '下一步'" customStyle="margin-top: 50px" @click="submit"></u-button>
		<u-button v-if="answerCompleteStatus === 'end'" class="btn-status" type="primary" text="开始答题"
			customStyle="margin-top: 50px" @click="handleStartAnswer"></u-button>
	</view>
</template>

<script>
	import {
		answerInfoList,
		titleInfo
	} from './constant.js'
	import {
		fetchModel,
		fetchRules,
		getStandardModelInfo
	} from './utils.js'

	//#ifndef H5 
	const recorderManager = uni.getRecorderManager();
	//#endif
	export default {
		data() {
			return {
				titleInfo,
				showTitleStatus: false,
				// 记录状态wait , end
				answerCompleteStatus: 'end',
				// 收集接口信息
				allParamsInfoList: [],
				allQuestionModel: [],
				// 34 个题目
				// 26 多选
				// 5 单选多级
				currentQuestionIndex: 0,
				currentQuestionModel: {},
				allAnswerList: answerInfoList,
				otherMessageMark: '其他，请注明',
				currentBtnStatus: false,
				answerList: [],
				actionsList: [],
				currentC5Id: '',
				currentC5Title: '',
				showSex: false,
				lengthC5: 0,
				rules: {},
				model1: {},
			}
		},
		onReady() {
		},
		onLoad() {
			//#ifndef H5 
			recorderManager.onStop(function(res) {
				// 录音接口分片调取
				uni.uploadFile({
			       url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
			       filePath: res.tempFilePath,
			       name: 'file',
			       formData: {
			         'user': 'vodice'
			       },
			       success (res){
			         const data = res.data
			       }
			     })
			});
			
			//#endif
		},
		watch: {
			answerCompleteStatus(value) {
				console.log('value', value)
				if (value === 'ready') {
					// 34
					this.initList(0)
				}
			},
			currentQuestionIndex(newValue) {
				const length = this.allAnswerList.length - 1
				if (length === newValue) {
					this.currentBtnStatus = true
				}
			},
		},
		methods: {
			// 开启录音
			startRecord() {
				const options = {
					// duration: 10000,
					// sampleRate: 44100,
					// numberOfChannels: 1,
					// encodeBitRate: 192000,
					format: 'mp3',
					// frameSize: 50
				}
				console.log('start')
				//#ifndef H5 
				recorderManager.start(options);
				//#endif
			},
			// 结束录音
			stopRecord() {
				//#ifndef H5 
				recorderManager.stop()
				//#endif
			},
			goNext() {
				const model = getStandardModelInfo(this.model1, answerInfoList[this.currentQuestionIndex])
				const length = this.allAnswerList.length - 1
				this.allParamsInfoList.push(model)
				const status = model?.value?.filter(item => item.includes('终止调查'))
				this.stopRecord()
				// 终止调查发起接口提交且终止录音
				if (status?.length) {
					console.log('停止调查')
					this.requestApi('stopCheck')
					this.clear()
					return
				}
				// 最后一页、需要发起提交且终止录音
				if (this.currentQuestionIndex === length) {
					this.requestApi('stopCheck')
					this.clear()
					return
				}
				// 结束当前录音、开启下一个录音
				this.requestApi('startNext')
				// 每一页发起接口提交
				// 初始化当前页
				this.initList(++this.currentQuestionIndex)
			},
			// 接口切片上传
			requestApi(message, params) {
				// 结束当前录音、开启下一个录音
				if (this.answerCompleteStatus === 'startNext') {
					this.stopRecord()
				}
			},
			// 重置
			clear() {
				uni.$u.toast('操作通过')
				this.allAnswerList = answerInfoList
				this.showTitleStatus = false
				this.currentQuestionIndex = 0
				this.answerCompleteStatus = 'end'
				this.allParamsInfoList = []
				this.allQuestionModel = {}
				this.model1 = {}
				this.rules = {}
				this.length = 0
				this.currentBtnStatus = false
				this.answerList = []
				this.actionsList = []
				this.currentC5Id = ''
				this.currentC5Title = ''
				this.stopRecord()
			},
			initList(index) {
				// this.currentQuestionIndex
				const currentInfo = answerInfoList[index]
				const modelInfo = fetchModel(currentInfo)
				const rules = fetchRules(currentInfo)
				this.model1 = modelInfo
				this.rules = rules
				this.answerList = [currentInfo]
				setTimeout(() => {
					this.$refs.form1.setRules(rules)
				}, 0)
			},
			handleRadio(e, item, index) {
				if (item.id === 'A3' && index === 8) {
					// 大幅增加和增加: 展示B1、隐藏B2、B3
					// 不变:展示B3、隐藏B1、B2
					// 减少和大幅减少 :展示B2、 隐藏B1、B3
					const info = {
						'大幅增加': ['B2', 'B3'],
						'增加': ['B2', 'B3'],
						'不变': ['B1', 'B2'],
						'减少': ['B1', 'B3'],
						'大幅减少': ['B1', 'B3']
					}
					this.allAnswerList = this.allAnswerList.filter(node => !info[e].includes(node.id))
				}
				if (item.id === 'C8' && e === '线下') {
					const tag = `${item.id}-special`
					this.model1[tag] = ''
				}
			},
			changeBox(e, item, index) {
				const otherValue = Object.keys(item).includes('otherValue')
				this.$nextTick(() => {
					this.model1[item.id] = e
				})
				if (!e.includes(this.otherMessageMark) && otherValue) {
					this.$nextTick(() => {
						const tag = `${item.id}-otherValue`
						this.model1[tag] = ''
					})

				}
			},
			handleStartAnswer() {
				console.log('开始答题')
				this.answerCompleteStatus = 'ready'
				this.startRecord()
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				//C5: 进行特殊校验，目前没有找到更好的校验方式
				this.$refs.form1.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.goNext()
				}).catch(errors => {
					console.log('errors', errors)
					const info = errors[0] || '校验失败'
					uni.$u.toast(`请填写${info.field}问卷信息`)
				})
			},
			sexSelect(e) {
				this.model1[e.parent] = e.name
				this.$refs.form1.validateField(this.model1[e.parent])
			},
			handleChangeOther(e, item, index) {
				const {
					parent
				} = item
				const tag = `${parent}-${index}-content`
				this.model1[tag] = e
			},
			handleChildSelect(item, index) {
				console.log('item', item)
			},
			handleFormClick(item, index) {
				
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-container {
		padding: 0 20px;
	}

	.box-child {
		width: 100%;
	}

	.btn-status {
		// position: absolute;
		// bottom: 20px;
		// right: 0;
		// left: 0;
		// width: 80%;
	}

	.main-title {
		margin-top: 15px;
	}

	.main-title-bold {
		font-weight: 500;
		color: #000;
	}

	.indent {
		text-indent: 15px;
	}
	::v-deep .u-action-sheet {
		height: 300px;
		overflow-y: scroll;
	}
</style>