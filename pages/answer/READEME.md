## 提交表单数据
1、注意必须手动设置 rules 和 model 否则表单校验不会生效
	```bash
		this.$refs.form1.setRules(rules)
	```
	
2、表单中的 prop 会严格映射 rules中 对应的字段

## 坑点：
1、源码校验核心child.prop, 所以手动设置 rules 和 model的重要性
   ```bash
	 const rule = this.formRules[child.prop];
	 // 如果不存在对应的规则，直接返回，否则校验器会报错
	 if (!rule) return;
   ```
2、
	```bash
		const validator = new Schema({
	       [propertyName]: ruleItem,
	     });
	     validator.validate({
	         [propertyName]: propertyVal,
	       },
	       (errors, fields) => {
	         if (uni.$u.test.array(errors)) {
	           errorsRes.push(...errors);
	           childErrors.push(...errors);
	         }
	         child.message =
	           childErrors[0]?.message ?? null;
	       }
	    );
   ```