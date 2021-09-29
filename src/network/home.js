import { request } from "./request";

export function getHomeMultidata() {
  return request({
    // url: '/category/get'
    url: '/home/multidata'
  })
}