import React, { useState, useRef,useEffect } from 'react';
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control';
import { transform } from "ol/proj";

import { gitBaseMap } from './baseMap'; 
import mapTypeImg from '../../images';

import './style.scss'

function MapWrapper(props) {
    
    const [nightModel, terrain, rasterBaidu, satellite, rasterGaode] = [...gitBaseMap()];
    const baseMap = [
      {key:5,title:'黑夜',style:'nightModel'},
      {key:4,title:'卫星',style:'satellite'},
      {key:3,title:'街道一',style:'rasterBaidu'},
      {key:2,title:'地形',style:'terrain'},
      {key:1,title:'街道二',style:'rasterGaode'},     
    ] 
    const centerPos = transform([117.29, 31.85], 'EPSG:4326', 'EPSG:3857');
    const mapElement = useRef(null);
    let map = null; 

    const changeMapStyle = (e) => {
      map.getLayers().forEach((value,index) => {
        if(index + 1 == e){
          value.setVisible(true) 
        }else{
          value.setVisible(false)
        }
      });
    }

    const renderButton = () => {
      let dom = null
      return (
      baseMap.map((value,index) => {
        dom = (<div className='map-container_button--change' onClick={() =>changeMapStyle(value.key)} key={index + 1}>
          <img className='map-container_image' src= {mapTypeImg[value.style]} alt='图片' />
          <span className='map-container_span' >{value.title}</span>
          </div>)
        return dom;
      }))
    }

    useEffect(()=>{
      if(map == null){
        map = new Map({
            view: new View({
                center: centerPos,//地图中心位置
                zoom: 10,//地图初始层级
                // maxZoom: 15,
                // minZoom: 9
            }),
            layers: [
              rasterGaode,
              terrain, 
              rasterBaidu, 
              satellite, 
              nightModel
            ],
            controls: defaultControls({
                attribution: false,
                zoom: false,
                rotate: false,
              }),
            target: mapElement.current,
        });
      } 
    },[])

    return (
      <>
       <div ref={mapElement} className="map-container" />
        <div className="map-container_button" >
          {renderButton()}
        </div>
      </>
    )
}

export default MapWrapper
