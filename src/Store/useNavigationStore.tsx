// navigationStore.ts
import create from 'zustand';

type NavigationStore = {
  breadcrumbs: string;
  iconBreadcrumbs: string;
  visibleMenu: boolean;
  setVisibleMenu: (visibleMenuNew: boolean) => void;
  setBreadcrumbs: (breadCrumbNew: string) => void;
  setIconBreadcrumbs: (iconBreadcrumbNew: string) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => (
  {
    visibleMenu: false,
    setVisibleMenu: (visibleMenuNew: boolean) => set({ visibleMenu: visibleMenuNew }),
    breadcrumbs: 'Inicio',
    setBreadcrumbs: (breadCrumbNew: string) => set({ breadcrumbs: breadCrumbNew }),
    iconBreadcrumbs: '',
    setIconBreadcrumbs: (iconBreadcrumbNew: string) => set({ iconBreadcrumbs: iconBreadcrumbNew }),
  }
));