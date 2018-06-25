import {getServerHost} from '../config.jsx';
import http from '../common/http.jsx';

var api = {
    //----------------------------------product detail api-------------------------------------------

    getSpecialtySpecificationDetailBySpecialtyID(id, callback) {
        http.ajax({
            url: getServerHost() + '/product/specification_detail_by_specialty_id?id=' + id,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getSpecialtySpecificationDetailBySpecificationID(id, callback) {
        http.ajax({
            url: getServerHost() + '/product/specification_detail_by_specification_id?id=' + id,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },

    getSpecialtyCommentDetail(id, page, rows, callback) {
        http.ajax({
            url: getServerHost() + '/product/appraisedetail?id=' + id + "&page=" + page + "&rows=" + rows,
            crossDomain:true,
            success: (rs) => {
                callback && callback(rs);
            }
        });
    },


};

export default api;