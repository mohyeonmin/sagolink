// import React from 'react';
// import logo from './logo.svg';
import './App.css';

import React, { useEffect, useMemo, MouseEvent } from 'react';

interface Hospital {
  id: string;
  hospitalName: string;
  lat: number;  // 위도
  lng: number;  // 경도
}

// interface Marker{
//   position : ;
//   title: string;
//   image : ;
//   clickalbe : boolean;
// }

declare global {
  interface Window {
    kakao: any;
    changePosition: any;
    setHospitals: (hospitals: Hospital[]) => void;
  }
}

const tempHospitals: Hospital[] = [
  { id: '000001', hospitalName: '1번 병원', lat: 33.450701, lng: 126.570267 },
  { id: '000002', hospitalName: '2번 병원', lat: 33.440701, lng: 126.570368 },
  { id: '000003', hospitalName: '111번 병원', lat: 33.460701, lng: 126.570677 },
  { id: '000004', hospitalName: '병원 04', lat: 33.450701, lng: 126.570467 },
  // { id: '000005', hospitalName: '5번 병원', lat: 33.450701, lng: 126.570467 },
  // { id: '000006', hospitalName: '6번 병원', lat: 33.450701, lng: 126.570367 },
];

const App: React.FC = () => {
  const [map, setMap] = React.useState(null);
  const [mapLevel, setMapLevel] = React.useState(0);
  const [hospitals, setHospitals] = React.useState([]);
  const [count, setCount] = React.useState<number>(0);


  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map1 = new window.kakao.maps.Map(container, options);

    map1.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.ToPRIGHT);
    map1.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);

    //교통 정보 추가
    //map1.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

    //마커 이동시키기



    setMap(map1);
    // setMapLevel(map.getLevel());
    console.log(map);

    if (hospitals.length > 0) {

    }
  }, [hospitals]);

  window.changePosition = (props: { lat: number, lng: number }) => {
    // alert(lat + ', ' + lng);
    // alert(props);
    var moveLatLon = new window.kakao.maps.LatLng(props.lat, props.lng);
    map.panTo(moveLatLon);
  };

  window.setHospitals = (/* hospitals: Hospital[] */) => {
    // setHospitals(tempHospitals);
    makeMakers();
  }

  const makeMakers = () => {
    var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    tempHospitals.forEach((hospital: Hospital) => {

      // 마커 이미지의 이미지 크기 입니다
      let imageSize = new window.kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(hospital.lat, hospital.lng), // 마커를 표시할 위치
        title: hospital.hospitalName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
        clickable: true
      });

      // 인포윈도우
      // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      // 인포윈도우를 생성합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        zIndex: 1
      });





      window.kakao.maps.event.addListener(marker, 'click', function () {
        // alert(hospital.hospitalName);

        //TODO: 내부 내용 함수화 시키기
        // changeMarker(hospital, marker);

        //마커 중심으로 이동
        let moveLatLng = new window.kakao.maps.LatLng(hospital.lat, hospital.lng);
        map.panTo(moveLatLng);

        console.log(map);

        // 마커 크기 변경
        // 마커 이미지의 이미지 크기 입니다
        let imageSizeChange = new window.kakao.maps.Size(50, 50);
        let markerImagechange = new window.kakao.maps.MarkerImage(imageSrc, imageSizeChange);
        marker.setImage(markerImagechange);

        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + hospital.hospitalName + '</div>')
        infowindow.open(map, marker);

      });

      marker.setMap(map);
    });

    // const changeMarker = (hospital: Hospital, marker: ) => {
    //   //마커 중심으로 이동
    //   let moveLatLng = new window.kakao.maps.LatLng(hospital.lat, hospital.lng);
    //   map.panTo(moveLatLng);

    //   // 마커 크기 변경
    //   // 마커 이미지의 이미지 크기 입니다
    //   let imageSizeChange = new window.kakao.maps.Size(50, 50);
    //   let markerImagechange = new window.kakao.maps.MarkerImage(imageSrc, imageSizeChange);
    //   marker.setImage(markerImagechange);
    // };

  };




  // const marker_test = () => {
  //   const marker = new window.kakao.maps.Marker({
  //     position: new window.kakao.maps.LatLng(33.450701, 126.570667), // 마커의 좌표
  //     map: map // 마커를 표시할 지도 객체
  //   });

  //   window.kakao.maps.event.addListener(marker, 'click', function () {
  //     alert("드뎌 되었다?");

  //     var moveLatLon = new window.kakao.maps.LatLng(33.450701, 126.570667);
  //     map.panTo(moveLatLon);


  //   });

  // }

  // interface xy {
  //   lat: number;
  //   lng: number;
  // }

  // // marker 함수 만들기
  // const createMarker = (a: xy) => {
  //   a.lat
  //   a.lng
  // }

  // const b: xy = {
  //   lat: 123,
  //   lng: 333,
  // }
  // createMarker(b);

  const onPress_down = () => {
    console.log(map);
    if (map !== undefined) {
      const level = map.getLevel();
      map.setLevel(level - 1);
    }
  };

  const onPress_up = () => {
    if (map !== undefined) {
      const level = map.getLevel();
      map.setLevel(level + 1);
    }
  };


  // 버튼 누를시 변경

  // const click_test = (event: MouseEvent) => {
  //   alert(count);
  //   if (count % 2 == 1) {
  //     alert(event.currentTarget.tagName);
  //   }
  //   else {
  //     alert("짝수일때");
  //   }
  //   setCount(count + 1);
  // };


  // 화면에서 보여주는 곳
  return (
    <div className="App">

      <div id="button" >
        <button onClick={onPress_down} id="level_down">level_down</button>

        <button onClick={onPress_up} id="level_up">level_up</button>

        <button onClick={makeMakers} id="marker">marker</button>

        {/* <button onClick={click_test} >click_test</button> */}

        {/* <button onClick={marker_test} style={{ height: "3vh", width: "10vw" }} /> */}

      </div>
      {/* <div id="select">

      </div> */}

      <div id="map" style={{ width: "100vw", height: "100vh" }} />

    </div>
  );


}


export default App;