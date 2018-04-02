import moment from 'moment';
import Vue from 'vue';

export const bus = new Vue();
export const BUS_EVENT = {
  // 在发布动态成功后清空上传的图片
  // emit by: dynamic-publish.vue
  // handle by: dynamic-image-upload.vue
  CLEAR_UPLOAD_IMAGES: 'CLEAR_UPLOAD_IMAGES'
};

/**
 * pattern
 */
export const usernamePattern = /^[\w\u4e00-\u9fa5]{2,15}$/;
export const emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

// TODO: refine
export const getQueryParams = (key) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
};

moment.locale('zh-cn', {
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  }
});

// 返回date相对于当前时间是多久之前
export const formatTimeAgo = date => moment(date).fromNow();
