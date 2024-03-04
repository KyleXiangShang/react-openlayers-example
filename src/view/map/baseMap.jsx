import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

export const gitBaseMap = () => {
    //黑夜
    const nightModel = new TileLayer({
        source: new XYZ({
          url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
        }),
        name: 'nightModel',
        visible: false,
    });
    //地形
    const terrain = new TileLayer({
    source: new XYZ({
        tileSize: 256,
        tileUrlFunction(xyz) {
        const [z, x, y] = xyz;
        const newY = parseInt(String(2 ** z), 10) + y; 
        return `https://p${Math.floor(
            Math.random() * 4
        )}.map.gtimg.com/demTiles/${z}/${Math.floor(x / 16)}/${Math.floor(
            newY / 16
        )}/${x}_${newY}.jpg?version=236`;
        },
        wrapX: false,
    }),
    name: 'terrain',
    visible: false,
    });
    //街道 - 腾讯
    const raster = new TileLayer({
    source: new XYZ({
        tileSize: 256,
        tileUrlFunction(xyz) {
        const [z, x, y] = xyz;
        const newY = parseInt(String(2 ** z), 10) + y; // 此处极其重要
        return `https://rt${Math.floor(
            Math.random() * 4
        )}.map.gtimg.com/realtimerender?z=${z}&x=${x}&y=${newY}&key=UDABZ-HMZ64-ASRUO-D66BG-ZJRJ5-K4BXS`;
        },
        wrapX: false,
    }),
    name: 'raster',
    visible: false,
    });
    //卫星
    const satellite = new TileLayer({
    source: new XYZ({
        tileSize: 256,
        tileUrlFunction(xyz) {
        const [z, x, y] = xyz;
        const newY = parseInt(String(2 ** z), 10) + y; 
        return `https://p${Math.floor(
            Math.random() * 4
        )}.map.gtimg.com/sateTiles/${z}/${Math.floor(x / 16)}/${Math.floor(
            newY / 16
        )}/${x}_${newY}.jpg?version=236`;
        },
        wrapX: false,
    }),
    name: 'satellite',
    visible: false,
    });
    //街道 - 高德
    const rasterGaode = new TileLayer({
    source: new XYZ({
        url: 'https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}', //高德地图 -- 街道
    }),
    name: 'rasterGaode',
    visible: true,
    });

    return [nightModel, terrain, raster, satellite, rasterGaode];
}