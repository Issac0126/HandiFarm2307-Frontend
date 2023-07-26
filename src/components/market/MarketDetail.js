import React, { useState, useEffect } from "react";
import "./Market.scss";
import "../.././Custom.scss";
// mui 아이콘 > 시작
import HomeIcon from '@mui/icons-material/Home';
// mui 아이콘 > 끝!
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Rating } from "@mui/material";
import { StarBorderRounded } from "@mui/icons-material"; //별점 아이콘
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getLoginUserInfo } from "../util/login-utils";
import { API_BASE_URL } from "../../config/host-config";



// 필요 데이터: 상품명, 판매내용, 가격, 이미지번호-(이미지 링크), 등록일, 판매여부
const MarketDetail = () => {

  const location = useLocation();
  const itemNo = location.state.itemNo;

  const redirection = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getLoginUserInfo().token); //토큰

  const [thisItem, setThisItem] = useState([]);

  useEffect(() => {

    const requestHeader = {
      'content-type' : 'application/json',
      'Authorization' : 'Bearer ' + token
    };

    fetch(`${API_BASE_URL}/api/market/${itemNo}`, {
      headers : requestHeader
    })
    .then(res => {
      if(!res.ok) {
        if(res.status === 403) alert('로그인한 사용자만 접근할 수 있는 페이지입니다.');
        else if(res.status === 500) alert('500에러')
        else alert('로딩 중 문제가 발생하였습니다. 관리자에게 문의바랍니다.')
        redirection('/');
        return;
      }
  
      res.json().then(data => { 
        console.log('data', data);
        setThisItem(data)
      })
    })

    //로딩 완료
    setLoading(false)
    
  }, []) //useEffect END


  const loadingPage = (
    <div id="loading">
      <img id="loadingElement" 
          src="https://cdn-icons-png.flaticon.com/512/189/189768.png"/>
    </div>   
  )


  const buyBtn = (e) => {
    //구매버튼
    console.log("구매하기 버튼 클릭!");
  };




  return (
    <>
      { loading ? loadingPage : 
        <div className="container market-detail">
          <div className="sub-link">
            <Link to="/"><HomeIcon/></Link> <span>> </span>
            <Link to="/market">거래장터</Link> <span>> </span>
            <Link to="#">상세보기</Link>
          </div> 
          <h1>거래장터</h1>
          <hr className="h1-bottom" />

          <div className="content">
            <Grid className="content-img">
              <article>
                <img
                  src={ (thisItem.imgLinks) ? thisItem.imgLinks[0] : require('../../image/no-image.jpg') }
                  alt="#"
                />
              </article>
            </Grid>
            <Grid className="content-content">
              <Button className="green-btn" variant="contained" disabled>
                판매 중
              </Button>
              <div className="title">
                <strong>{thisItem.itemName}</strong> <span>{thisItem.regDate}</span>
              </div>
              {/* <div className="score">
                <Rating
                  defaultValue={2} //별점데이터
                  size="large"
                  readOnly
                  emptyIcon={<StarBorderRounded fontSize="inherit" />}
                />
                <em>2n개 상품평</em>
              </div> */}

              <div className="from">
                <span>
                  판매자: {thisItem.seller}<br />
                </span>
              </div>
              <div className="text">
                <p>
                  <em>
                    {thisItem.itemContent}
                  </em>
                </p>
              </div>
              <div className="price">
                <strong>{thisItem.price}원</strong>
                <p>우체국 택배 10,000원 이상 무료 배송!</p>
              </div>

              <div className="btn-center">
                <Button
                  className="green-btn center"
                  id="buy-btn"
                  type="button"
                  variant="contained"
                  onClick={buyBtn}
                >
                  바로 구매 <ChevronRightIcon />
                </Button>
              </div>
            </Grid>
            {/* content-content END */}
          </div>
        </div>
      }
    </>
  );
};

export default MarketDetail;
