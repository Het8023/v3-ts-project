import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginParamsType, userInfoType } from '@/api/auth/types'
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'
import { loginApi, userInfoApi } from '@/api/auth'
import type { RouteComponent } from 'vue-router'
import router, { dynamicRoutes, errorRoutes } from '@/router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // token
    const accessToken = ref<string>('')
    // 用户信息
    const userInfo = ref<userInfoType>()
    // 菜单数据
    const menuList = ref<MenuItemType[]>([])
    // 按钮权限数据
    const buttonList = ref<string[]>([])
    // 用户名与密码的数据
    const rememberData = ref<LoginParamsType>()

    // 登录操作
    const login = async (data: LoginParamsType) => {
      try {
        const res = await loginApi(data)
        accessToken.value = res.data.access_token
        return res
      } catch (e) {
        console.log(e)
      }
    }

    // 获取用户信息
    const getUserInfo = async () => {
      try {
        const res = await userInfoApi()
        userInfo.value = res.data.userInfo
        menuList.value = res.data.menuList
        buttonList.value = res.data.buttonList
        await filterRouter()
        return res
      } catch (e) {
        console.log(e)
      }
    }

    // 过滤出当前所拥有的路由数据
    const filterRouter = () => {
      const viewsModules = parseRouteKey()
      const newRouter = dynamicImportComponent(menuList.value, viewsModules)
      addRouterHandle(newRouter)
    }

    // 动态添加路由
    const addRouterHandle = (newRouter: any) => {
      dynamicRoutes[0].children = [...(newRouter || []), ...errorRoutes]
      console.log('dynamicRoutes', dynamicRoutes)
      dynamicRoutes.forEach((route) => {
        router.addRoute(route)
      })
    }

    // 将后台返回的component转化为动态导入路由组件 component : '/home/index.vue' => conmponent = () => import()
    const dynamicImportComponent = (
      menuList: MenuItemType[],
      viewsModules: Record<string, RouteComponent>
    ) => {
      if (menuList.length <= 0) return []
      return menuList.map((item: MenuItemType) => {
        console.log('item=>', item)
        const { component } = item
        if (component) {
          item.component = viewsModules[`${component}`] || viewsModules[`/${component}`]
        }
        item.children && dynamicImportComponent(item.children, viewsModules)
        return item
      })

      // return menuList
    }

    // 处理导入组件的key值
    const parseRouteKey = () => {
      // @ts-ignore
      const modules = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/**'])
      const viewsModules: Record<string, RouteComponent> = Object.keys(modules).reduce(
        (prevObj, currentKey) =>
          // 将src/view重置''
          Object.assign(prevObj, {
            [currentKey.replace(/\/src\/views|..\/views/, '')]: modules[currentKey]
          }),
        {}
      )

      return viewsModules
    }

    return {
      accessToken,
      userInfo,
      menuList,
      buttonList,
      login,
      getUserInfo,
      filterRouter
    }
  },
  {
    persist: {
      paths: ['accessToken']
    }
  }
)
