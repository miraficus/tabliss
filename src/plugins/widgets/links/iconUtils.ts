import mdiIcons from '@iconify/json/json/mdi.json';

export interface IconifyIcon {
  body: string;
  width?: number;
  height?: number;
}

export interface IconifyJSON {
  prefix: string;
  icons: { [key: string]: IconifyIcon };
}

export function getAllMDIIcons(): string[] {
  const iconData = mdiIcons as IconifyJSON;
  return Object.keys(iconData.icons).map(name => `${iconData.prefix}:${name}`);
}