import request from '@/utils/request'
import type { StatisticsResType } from '@/api/home/types'

// 营业数据统计
export const getStatisticsApi = () => {
  return request<StatisticsResType>('/home/statistics', 'GET')
}
