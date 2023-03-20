/*global kakao*/ 
import { useEffect, useState } from "react";
import * as S from "./WriteMap.styled";

const {kakao} = window;

export default function KakaoMapT({setLocation}) {
  const [address, setAddress] = useState('')
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=53df67d0f937225bf2314c1685df256a&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(function () {
        let markers = [];

        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(38.2313466, 128.2139293),
          level: 1,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
          38.2313466,
          128.2139293
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        const ps = new window.kakao.maps.services.Places();

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        const searchForm = document.getElementById("submit_btn");
        searchForm?.addEventListener("click", function (e) {
          e.preventDefault();
          searchPlaces();
        });

        function searchPlaces() {
          const keyword = document.getElementById("keyword").value
          console.log(keyword)
          if (!keyword.replace(/^\s+|\s+$/g, "")) {
            alert("키워드를 입력해주세요!");
            return false;
          }

          ps.keywordSearch(keyword, placesSearchCB);
        }

        function placesSearchCB(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);

            displayPagination(pagination);

            const bounds = new window.kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }

            map.setBounds(bounds);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        function displayMarker(place) {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          window.kakao.maps.event.addListener(
            marker,
            "click",
            function (mouseEvent) {
              console.log(place)
              setLocation(place)
              setAddress(place);
              infowindow.setContent(`
              <div style="padding:5px;z-index:1;color:black">
              ${place.place_name}
              </div>
              `);
              infowindow.open(map, marker);
              const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
              map.panTo(moveLatLon);
            }
          );
        }

        function displayPlaces(places) {
          const listEl = document.getElementById("placesList");
          const menuEl = document.getElementById("menu_wrap");
          const fragment = document.createDocumentFragment();
          // const bounds = new window.kakao.maps.LatLngBounds();
          removeAllChildNods(listEl);
          removeMarker();
          for (let i = 0; i < places.length; i++) {
            const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x
            );
            const marker = addMarker(placePosition, i);
            const itemEl = getListItem(i, places[i]);
            // bounds.extend(placePosition);
            (function (marker, title) {
              window.kakao.maps.event.addListener(
                marker,
                "mouseover",
                function () {
                  displayInfowindow(marker, title);
                }
              );

              window.kakao.maps.event.addListener(
                marker,
                "mouseout",
                function () {
                  infowindow.close();
                }
              );

              itemEl.addEventListener("click", function (e) {
                displayInfowindow(marker, title);
                setAddress(places[i]);
                setLocation(places[i])
                map.panTo(placePosition);
              });
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
          }

          listEl?.appendChild(fragment);
          menuEl.scrollTop = 0;

          // map.panTo(bounds);
        }

        function getListItem(index, places) {
          const el = document.createElement("li");

          let itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.place_name +
            "</h5>";

          if (places.road_address_name) {
            itemStr +=
              "    <span>" +
              places.road_address_name +
              "</span>" +
              '   <span class="jibun gray">' +
              `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
              places.address_name +
              "</span>";
          } else {
            itemStr += "    <span>" + places.address_name + "</span>";
          }

          itemStr +=
            '  <span class="tel">' + places.phone + "</span>" + "</div>";

          el.innerHTML = itemStr;
          el.className = "item";

          return el;
        }

        function addMarker(position, idx) {
          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
          const imageSize = new window.kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );

          const marker = new window.kakao.maps.Marker({
            position,
            image: markerImage,
          });

          marker.setMap(map);
          markers.push(marker);

          return marker;
        }

        function removeMarker() {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }

        function displayPagination(pagination) {
          const paginationEl = document.getElementById("pagination");
          const fragment = document.createDocumentFragment();
          while (paginationEl?.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
          }

          for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement("a");
            el.href = "#";
            el.innerHTML = String(i);

            if (i === pagination.current) {
              el.className = "on";
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i);
                };
              })(i);
            }

            fragment.appendChild(el);
          }
          paginationEl?.appendChild(fragment);
        }

        function displayInfowindow(marker, title) {
          console.log(title)
          const content =
            '<div style="padding:5px;z-index:1;color:black">' + title + "</div>";

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }

        function removeAllChildNods(el) {
          while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
          }
        }
      });
    };
  }, []);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const onchangeSearch = (event) => {
    setSearch(event?.target.value);
  };

  const onClickSearchBarOpen = () => {
    setIsOpen(!isOpen);
  };
  const heightMenu = {
    
  }
  return (
    <S.MapSection className="map_wrap" isOpen={isOpen}>
      <div id="map"></div>

      <div id="menuDiv">
        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              <div id="map_title">
                <div>원하는 위치를 검색하세요</div>
              </div>

              <div id="form">
                <input
                  type="text"
                  value={search}
                  id="keyword"
                  onChange={onchangeSearch}
                />
                <button id="submit_btn" type="submit">
                  <S.SearchIcon />
                </button>
              </div>
            </div>
          </div>

          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>

        <div id="btnDiv">
          {isOpen ? (
            <div id="btnOn">
              <button
                id="searchBtn"
                onClick={onClickSearchBarOpen}
                type="button"
              >
                <S.LeftDisplayButton />
              </button>
            </div>
          ) : (
            <div id="btnOn">
              <button
                id="searchBtn"
                onClick={onClickSearchBarOpen}
                type="button"
              >
                <S.RightDisplayButton />
              </button>
            </div>
          )}
        </div>
      </div>
    </S.MapSection>
  );
}