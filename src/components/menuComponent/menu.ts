export const Menu = {
  links: [
    {
      title: 'menu.product',
      icon: 'ev_station',
      expanded: true,
      color: 'text-red-10',
      subMenu: [
        {
          title: 'menu.search',
          caption: 'quasar.dev',
          icon: 'search',
          to: '/search-products',
          color: 'text-red-10',
        },
        {
          title: 'menu.register',
          caption: 'quasar.dev',
          icon: 'add_circle',
          to: '/product',
          color: 'text-blue-10',
        },
      ],
    },
    {
      title: 'menu.logout',
      caption: 'github.com/quasarframework',
      icon: 'logout',
      to: 'https://github.com/quasarframework',
      expanded: false,
    },
  ]
}
