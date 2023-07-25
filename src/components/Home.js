import React, { useState, useEffect } from 'react'
import './Home.scss';
import '.././Custom.scss';
// mui 아이콘 > 시작
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp'; //날씨 맑음
import WbCloudyIcon from '@mui/icons-material/WbCloudy';  //날씨 구름
import UmbrellaIcon from '@mui/icons-material/Umbrella';  //날씨 비... 가 없다. 대신 우산.
import AcUnitIcon from '@mui/icons-material/AcUnit';      //날씨 눈
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
// mui 아이콘 > 끝!
// Link용 js파일 > 시작
import HomeTableBody from './HomeTableBody';
import HomeMarketBody from './HomeMarketBody';
import SnsBoardCarousel from './SnsBoardCarousel';
// Link용 js파일 > 끝!
import { Button, Stack, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginUserInfo } from './util/login-utils';
import { API_BASE_URL } from '../config/host-config';


const Home = () => {

  const redirection = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  
  //임시 데이터※※※※※※※※
  const boardList = [{
      category : '공지',
      title: '[필독] 게시판 이용 수칙을 꼭 읽어주세요.',
      userName: '관리자',
      createDate: '2023.06.28',
      views: '458'
    }, {
      category : '공지',
      title: '[필독] ㅇ0ㅇ.',
      userName: '관리자',
      createDate: '2023.04.28',
      views: '2410'
    }, {
      category : '자유',
      title: '님들 제가 키우는 강아지 시고르자브종 보고 가실래요?ㅎㅎㅎㅎ',
      userName: '왈왈이',
      createDate: '2023.07.02',
      views: '3'
    }, {
      category : '정보',
      title: 'Hello World!',
      userName: 'json',
      createDate: '2023.06.28',
      views: '15'
    }, {
      category : '정보',
      title: 'Hello World!',
      userName: 'json',
      createDate: '2023.06.28',
      views: '15'
    }
  ]



  const [marketList, setMarketList] = useState([]);
  useEffect(() => {

    const requestHeader = {
      // 'content-type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    };

    fetch(`${API_BASE_URL}/api/market`, {
      headers : requestHeader
    })
    .then(res => {
      if(!res.ok) {
        if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
        else alert('로딩 중 문제가 발생하였습니다. 관리자에게 문의바랍니다.')
        redirection('/');
        return;
      }
  
      console.log('헤헤');
      res.json().then(data => { 
        setMarketList(data.marketItems);
        console.log(data.marketItems);
      })
    })

    //로딩 완료함!
    setLoading(false)
    
  }, []) //useEffect END


  const imgs = [ 
    {img:'https://static6.depositphotos.com/1046511/631/i/600/depositphotos_6310141-stock-photo-bountiful-harvest.jpg'},
    {img:'https://www.nongmin.com/-/raw/srv-nongmin/data2/content/image/2022/06/16/.cache/512/20220616196317.jpg'},
    {img:'https://src.hidoc.co.kr/image/lib/2021/9/3/1630652987056_0.jpg'},
    {img:'https://cdn.mkhealth.co.kr/news/photo/202212/61768_65496_2151.jpg'},
    {img:'https://shop.shouse.garden/data/goods/302/2022/06/_tmp_f2fe2dc5b4ce8345ecd5133bf984c2e89119view.jpg'}
  ];
  //임시 데이터※ ※ ※※※※※※



  return (
    <>
      <div className='container home'>
        <div className="sub-link">
          <Link to="/"></Link>
        </div>

          <Link to='/pest'>Pest 이동</Link>
          {/* 날씨 박스 */}
          <section className='weather-box'>
          <div className='title'><h2>제주<br/>날씨</h2></div>

              <div className='weather D0'>
                <div>
                  <div className='day'><h3>오늘</h3><span>7/5</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span><i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span><i><WbCloudyIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span><hr/><span>28℃</span>
                </div>
              </div> {/* weather D-0 END */}
              
              <div className='weather D1'>
                <div>
                  <div className='day'><h3>내일</h3><span>7/6</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span><i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span><i><WbSunnySharpIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span><hr/><span>28℃</span>
                </div>
              </div> {/* weather D+1 END */}

              <div className='weather D2'>
                <div>
                  <div className='day'><h3>모레</h3><span>7/7</span></div>
                  <div className='icon'>
                    <span className='am'>오전</span><i><WbSunnySharpIcon /></i>
                    <span className='pm'>오후</span><i><WbCloudyIcon /></i>
                  </div>
                </div>
                <div className='temp'>
                  <span>25℃</span><hr/><span>28℃</span>
                </div>
              </div> {/* weather D+2 END */}

          </section>
          {/* 날씨 박스 끝  */}

          <section className='button-box'>
            <Link to='/weather'><Button variant="success">오늘의 정보</Button></Link>
            <Link to='/board'><Button variant="success">게시판</Button></Link>
            <Link to='#'><Button variant="success">농사일기</Button></Link>
            <Link to='/market'><Button variant="success">거래장터</Button></Link>
          </section>

          <section className='small-board'>
            <h2>게시판</h2>
            <Table bordered hover border={1} className='mini-table' >
              <thead>
                <tr>
                  <th>말머리</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th >조회</th>
                </tr>
              </thead>
              <tbody> {/* 본문 내용 */}
                {boardList.map(bo =><HomeTableBody board={bo}/>)}
              </tbody>
            </Table>
          </section>

          <section className='small-snsBoard'>
            <h2>농사일기</h2>
            <div className='img-list'>
              <div className='arrow'><ArrowCircleUpIcon /></div> {/* 아이콘 바꾸고 싶다 */}
              {/* { imgs.map(i => <SnsBoardCarousel imgs={i}/>) } */}
              <figure><img src="https://qi-o.qoo10cdn.com/goods_image_big/7/6/3/4/7297927634_l.jpg" alt="농작물 사진" /></figure>
              <figure><img src="https://qi-o.qoo10cdn.com/goods_image_big/7/6/3/4/7297927634_l.jpg" alt="농작물 사진" /></figure>
              <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2g4cD2YDqeomQJ4Jg0hSv9B8aX9jq2aooOZPIMyWQDS7CHrdQ9vHfEZaEqGwhDIAol1c&usqp=CAU" alt="농작물 사진" /></figure>
              <div className='arrow'><ArrowCircleUpIcon /></div>
            </div>
          </section>

          <section className='small-market'>
            <h2>거래장터</h2>
            <div className='market-group'>
              { marketList.map(ma =><HomeMarketBody market={ma}/>) }
            </div> {/* market-group END */}
          </section>

      </div>




        
    
    </>
  )
}

export default Home