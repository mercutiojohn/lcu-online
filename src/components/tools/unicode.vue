// http://c.biancheng.net/view/5602.html

// escape()编码：
const time = 2018-02-09
const tile = '63元黑糖颗粒固饮'
let url = “http://localhost:8080/index.html?time="+escape(time)+"&title="+escape(tile)
//地址栏显示结果：“http://localhost:8080/index.html?time=2018-01-09&title=63%u5143%u9ED1%u7CD6%u9897%u7C92%u56FA%u996E"
  
// unescape（）解码：
let url = “http://localhost:8080/index.html?time="+unescape(2018-01-09)+"&title="+unescape(63%u5143%u9ED1%u7CD6%u9897%u7C92%u56FA%u996E)
// 地址栏显示结果： “http://localhost:8080/index.html?time=2018-01-09&title=63元黑糖颗粒固饮"