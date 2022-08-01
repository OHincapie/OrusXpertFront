import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'ORUSXPERT',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ciudades',
        link: '/pages/tables/ciudades',
      },
      {
        title: 'Habitantes',
        link: '/pages/tables/habitantes',
      }
    ],
  },
];
