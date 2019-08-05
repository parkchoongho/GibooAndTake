var express = require('express');
var router = express.Router();
 
/* post member_insert */
router.post('/', function(req, res, next) {
  //biz  
    const searchType=req.body.searchType;
    const donate_input=req.body.donate_input;
 
    const result={msg:''};
    if((searchType==0||searchType==1) && donate_input){//정상 처리
      const donate_info={
        재단명:" : 초록우산 어린이재단",
        핵심가치:" : 어린이가 꿈을 키우며 올곧게 자라나 행복한 삶을 누릴 수 있는 세상을 만들어 갑니다.",
        후원내역:" : 국내사업- 아동보육비,학습비,의료비,주거비지원 해외사업-학교 건축 및 보수, 교육 자재 지원,교사와 학교 운영진 역량 강화, 교육 위원회 설립 및 운영 지원",
        기부후기:" : 영상 & 채팅창",
        good: " : ♡90"                     
      };
      
    
      result.msg=donate_info;
      res.json(JSON.stringify(result));
    }else{//에러 처리
      result.msg='조회 결과 없음';
      res.json(JSON.stringify(result));
    } 
});
module.exports = router;