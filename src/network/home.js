import { request } from "./request";

export function getHomeMultidata() {
  return request({
    // url: '/category/get'
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}


// 将数组不覆盖的放到别的数组中
// let num = []
// const num1 = [111,222,333]
// const num2 = [444,55,666]

// num.push(...num1)

// console.log(num);