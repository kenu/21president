const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API URL
const API_URL = 'https://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPofelcddRegistSttusInfoInqire';
// 공공데이터포털에서 발급받은 서비스 키
const SERVICE_KEY = '4MjolsmxrlqEv3hEBeSleWCFNguNi2rJoQBKD9xtry0x4uqqnpUcOJinPQt9Q0ASv%2Funl57K%2BVb5QjHvjDLAuQ%3D%3D';

// Routes
app.get('/', async (req, res) => {
  try {
    // Default parameters for the API
    const params = {
      ServiceKey: SERVICE_KEY,
      sgId: req.query.sgId || '20250603',
      sgTypecode: req.query.sgTypecode || '1',
      resultType: 'json'
    };
    
    // 임시 테스트용 하드코딩된 URL 사용
    const apiUrl = 'https://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPofelcddRegistSttusInfoInqire?ServiceKey=4MjolsmxrlqEv3hEBeSleWCFNguNi2rJoQBKD9xtry0x4uqqnpUcOJinPQt9Q0ASv%2Funl57K%2BVb5QjHvjDLAuQ%3D%3D&sgId=20250603&sgTypecode=1&resultType=json';
    console.log('API 요청 URL:', apiUrl);
    
    // API에서 데이터 가져오기
    const response = await axios.get(apiUrl);
    
    // API 응답 로깅
    console.log('API 응답:', JSON.stringify(response.data, null, 2));
    
    // API 응답에서 데이터 추출
    let electionData = [];
    if (response.data && response.data.response && 
        response.data.response.body && 
        response.data.response.body.items) {
      // items.item이 존재하는 경우 데이터 처리
      if (response.data.response.body.items.item) {
        electionData = Array.isArray(response.data.response.body.items.item) 
          ? response.data.response.body.items.item 
          : [response.data.response.body.items.item];
      }
    }

    // Render the home page with the data
    res.render('index', { 
      title: '제21대 대통령선거 정보', 
      data: electionData,
      error: null,
      query: req.query
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    
    // Render the home page with the error
    res.render('index', { 
      title: '제21대 대통령선거 정보', 
      data: [],
      error: '데이터를 불러오는 중 오류가 발생했습니다.',
      query: req.query
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
