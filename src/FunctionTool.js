/*
* 这是一个工具类，所有公共方法都要放到这里
*/

import moment from 'moment'

/*
* 说明:把浏览器地址栏中的查询串q=后面的条件解析映射回Filter组件的查询项中
* 1.把乱码还原成 name=='*胡达*';branchName=='*abc*';cabinet=='*123123*';discoveryIP=='*15.15.15.5*';createdTime>=1522717078000;createdTime<=1527728278000;firstClass =='NETWORK';secondClass =='ROUTER'
* 2.处理成字符串 name:胡达;branchName:abc;cabinet:123123;discoveryIP:15.15.15.5;createdTime:1522717078000;createdTime:1527728278000;firstClass:NETWORK;secondClass:ROUTER'
* 3.返回对象格式 {name:'胡达',branchName:'abc',cabinet:'123123'....}
*/
export function getFilterUrlMap (q) {
  let obj = {}

  if (q !== '' && q !== undefined) {
	//这一段代码是关于历史告警查询timein的特殊处理，没有办法后端的限制，污染公共方法
	if (q.includes('firstOccurrence=timein=')) {
		let arr = q.split(';')
		let str = arr.filter(item => item.includes('firstOccurrence=timein='))[0]
		str = str.replace('firstOccurrence=timein=(', '')
		str = str.replace(')', '')
		str = str.replace('T', ' ')
		str = str.replace('T', ' ')
		let timeArr = str.split(',')
		let timeRes = []
		timeArr.forEach(element => {
			element = moment(element)
			timeRes.push(element)
		})
		obj['firstOccurrence----'] =  timeRes
	}

	//这一段代码是关于multiSelect的处理。
	if (q.includes('or')) {
		let arr = q.split(';') // 查询q拆成数组
		let orArr = arr.filter(item => item.includes('or'))	// 过滤出包含or的条件数组
		orArr.forEach( item => {
				let res = []
				let keyName = ''
				item = item.replace('(', '')
				item = item.replace(')', '')
				let resArr = item.split(' or ')
				resArr.forEach( element => {
					let eArr = element.split('==')
					keyName = eArr[0]
					res.push(eArr[1])
				} )
				obj[keyName] = res
			}
		)
	}

    let _q = decodeURIComponent(q)	// 提前完成第2步操作，包括中文编码还原
    // 完成第2步操作
    _q = _q.replace(/>=/g, ':')
    _q = _q.replace(/<=/g, ':')
	_q = _q.replace(/==/g, ':')
    _q = _q.replace(/!=/g, ':')
    _q = _q.replace(/>/g, ':')
    _q = _q.replace(/</g, ':')
    _q = _q.replace(/\*/g, '')
	_q = _q.replace(/\'/g, '')
	_q = _q.replace(/\(/g, '')
	_q = _q.replace(/\)/g, '')
	_q = _q.replace(new RegExp(' ', 'g'), '')
    // 完成第3步操作
    if (_q.length > 0) {
      // 把查询条件中的子查询条件拆分成数组
			let cArr = _q.split(';')
			cArr = cArr.filter( item => !item.includes('or') )
			for (let _c of cArr) {
				let _key = _c.split(':')[0]
				let _val = _c.split(':')[1]

				if ( _key in obj ) { //有相同查询字段名的情况，视为一个查询区间
					//在此项目中，区间查询暂时只有时间类型，所以直接moment转日期对象了
					//后续如果有字符串、数字型区间查询再改
					obj[_key] = [moment(Number.parseInt(obj[_key])),moment(Number.parseInt(_val))]
				} else {
					obj[_key] = _val
				}
			}
		}
	}
	return obj
}

export function getFilterUrlMapOel (q) {
	q = q.replace(/ and /g, ';')
	q = q.replace(/\'/g, '')
	q = q.replace(/ like /g, '=')
	let obj = {}
	if (q !== '' && q !== undefined) {
	  //这是关于恢复告警的特殊处理代码
	  if (q.includes('Severity=0')) {
		q = q.replace('Severity=0;', '')
		obj.ISRECOVER = 0
	  } else if (q.includes('Severity!=0')) {
		q = q.replace('Severity=!0;', '')
		obj.ISRECOVER = 1
	  }

	  //这一段代码是关于multiSelect的处理。
	  if (q.includes('or')) {
		  let arr = q.split(';') // 查询q拆成数组
		  let orArr = arr.filter(item => item.includes('or'))	// 过滤出包含or的条件数组
		  orArr.forEach( item => {
				  let res = []
				  let keyName = ''
				  item = item.replace('(', '')
				  item = item.replace(')', '')
				  let resArr = item.split(' or ')
				  resArr.forEach( element => {
					  let eArr = element.split('=')
					  keyName = eArr[0]
					  res.push(eArr[1])
				  } )
				  obj[keyName] = res
			  }
		  )
	  }

	  let _q = decodeURIComponent(q)	// 提前完成第2步操作，包括中文编码还原
	  // 完成第2步操作
	  _q = _q.replace(/>=/g, ':')
	  _q = _q.replace(/<=/g, ':')
	  _q = _q.replace(/==/g, ':')
	  _q = _q.replace(/=/g, ':')
	  _q = _q.replace(/!=/g, ':')
	  _q = _q.replace(/>/g, ':')
	  _q = _q.replace(/</g, ':')
	  _q = _q.replace(/\*/g, '')
	  _q = _q.replace(/\'/g, '')
	  _q = _q.replace(/\(/g, '')
	  _q = _q.replace(/\)/g, '')
	  _q = _q.replace(new RegExp(' ', 'g'), '')

	  // 完成第3步操作
	  if (_q.length > 0) {
		// 把查询条件中的子查询条件拆分成数组
			  let cArr = _q.split(';')
			  cArr = cArr.filter( item => !item.includes('or') )
			  for (let _c of cArr) {
				  let _key = _c.split(':')[0]
				  let _val = _c.split(':')[1]
  
				  if ( _key in obj ) { //有相同查询字段名的情况，视为一个查询区间
					  //在此项目中，区间查询暂时只有时间类型，所以直接moment转日期对象了
					  //后续如果有字符串、数字型区间查询再改
					  obj[_key] = [moment(Number.parseInt(obj[_key]) * 1000),moment(Number.parseInt(_val * 1000))]
				  } else {
					  obj[_key] = _val
				  }
			  }
		  }
	  }
	  return obj
  }

/*
* 这是一个放在Select的Select的filterOption属性中的函数，主要目的是支持大小写查询。
*/
export function onSearchInfo(input, option) {
	return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0)
}
