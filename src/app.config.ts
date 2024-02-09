export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/poster_editor/index',
    'pages/chat/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#0D110F',
    position: 'bottom',
    selectedColor: '#3fa6ad',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/images/tabBar/home.png',
        selectedIconPath: 'assets/images/tabBar/home-active.png',
      },
      {
        pagePath: 'pages/chat/index',
        text: '聊天',
        iconPath: 'assets/images/tabBar/chat.png',
        selectedIconPath: 'assets/images/tabBar/chat-active.png',
      }
    ]
  }
})
