export enum EDropDownMenuPosition {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

export enum EDropDownTrigger {
  CLICK = 'click',
  HOVER = 'hover',
}

export enum EShortcutIcon {
  CHECK = 'i-mdi:check',
  COMMAND = 'i-mdi:apple-keyboard-command',
  CONTROL = 'i-mdi:apple-keyboard-control',
  MICROPHONE = 'i-mdi:microphone-outline',
  OPTION = 'i-mdi:apple-keyboard-option',
  POWER = 'i-mdi:power',
  SHIFT = 'i-mdi:apple-keyboard-shift',
  WORLD = 'i-fontisto:world-o',
}

export type TDropDownItem = {
  label: string;
  name: string;
  prefix?: { icon: EShortcutIcon; show: boolean };
  shortcuts?: string[];
  disabled?: boolean;
  divided?: boolean;
  // eslint-disable-next-line no-use-before-define
  subMenu?: TDropDownMenu;
};

export type TDropDownMenu = {
  position?: EDropDownMenuPosition;
  trigger?: EDropDownTrigger;
  label: string;
  name: string;
  item: TDropDownItem[];
};
