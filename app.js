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

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup body parser for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API URL
const API_URL = 'https://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPofelcddRegistSttusInfoInqire';
// 공공데이터포털에서 발급받은 서비스 키
const SERVICE_KEY = '4MjolsmxrlqEv3hEBeSleWCFNguNi2rJoQBKD9xtry0x4uqqnpUcOJinPQt9Q0ASv%2Funl57K%2BVb5QjHvjDLAuQ%3D%3D';

// Routes
app.get('/', async (req, res) => {
  try {
    // Fixed parameters for the API - only showing 20250603 election data
    const params = {
      ServiceKey: SERVICE_KEY,
      sgId: '20250603',
      sgTypecode: '1',
      resultType: 'json'
    };
    
    // params를 사용하여 URL 구성
    const apiUrl = `${API_URL}?ServiceKey=${params.ServiceKey}&sgId=${params.sgId}&sgTypecode=${params.sgTypecode}&resultType=${params.resultType}`;
    console.log('API 요청 URL:', apiUrl);
    
    // API에서 데이터 가져오기
    console.log('서버에서 API 요청 시작...');
    const response = await axios.get(apiUrl, {
      timeout: 10000, // 10초 타임아웃 설정
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    console.log('API 요청 성공!');
    
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
      error: null
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    
    // Render the home page with the error
    res.render('index', { 
      title: '제21대 대통령선거 정보', 
      data: [],
      error: '데이터를 불러오는 중 오류가 발생했습니다.'
    });
  }
});

// Detail page route
app.get('/candidate/:id', async (req, res) => {
  try {
    const candidateId = req.params.id;
    
    // Map candidate IDs to names
    const candidateNameMap = {
      '1': '이재명',
      '2': '김문수',
      '4': '이준석',
      '5': '권영국',
      '6': '구주와',
      '7': '황교안',
      '8': '송진호'
    };
    
    // Fixed parameters for the API - only showing 20250603 election data
    const params = {
      ServiceKey: SERVICE_KEY,
      sgId: '20250603',
      sgTypecode: '1',
      resultType: 'json'
    };
    
    // API에서 데이터 가져오기
    const apiUrl = `${API_URL}?ServiceKey=${params.ServiceKey}&sgId=${params.sgId}&sgTypecode=${params.sgTypecode}&resultType=${params.resultType}`;
    const response = await axios.get(apiUrl, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    // API 응답에서 데이터 추출
    let electionData = [];
    if (response.data && response.data.response && 
        response.data.response.body && 
        response.data.response.body.items) {
      if (response.data.response.body.items.item) {
        electionData = Array.isArray(response.data.response.body.items.item) 
          ? response.data.response.body.items.item 
          : [response.data.response.body.items.item];
      }
    }
    
    // Find the candidate with the matching name from ID
    const candidateName = candidateNameMap[candidateId];
    const candidate = electionData.find(item => item.name === candidateName);
    
    if (!candidate) {
      return res.status(404).render('error', { 
        title: '후보자 정보 없음', 
        message: '요청하신 후보자 정보를 찾을 수 없습니다.',
        error: { status: 404, stack: '' }
      });
    }
    
    // Render the detail page with the candidate data
    res.render('detail', { 
      title: `${candidate.name} 후보자 정보`, 
      candidate: candidate
    });
  } catch (error) {
    console.error('Error fetching candidate data:', error.message);
    
    // Render error page
    res.status(500).render('error', { 
      title: '오류 발생', 
      message: '후보자 정보를 불러오는 중 오류가 발생했습니다.',
      error: { status: 500, stack: process.env.NODE_ENV === 'development' ? error.stack : '' }
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
