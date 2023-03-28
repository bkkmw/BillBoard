import React, { useEffect, useState } from 'react';
import * as S from "../WriteMap.styled"
const {kakao} = window;

const RoomLocation = ({lat, lng}) => {
  const [isOpen, setIsOpen] = useState(true);
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
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 1,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
          lat,
          lng
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        const ps = new window.kakao.maps.services.Places();

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        function displayMarker(place) {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          window.kakao.maps.event.addListener(
            marker,
            "click",
            function (mouseEvent) {
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
  return (
    <div>
      <S.MapSection className="map_wrap" isOpen={isOpen}>
      <div id="map"></div>

    </S.MapSection>
      
    </div>
  );
};

export default RoomLocation;