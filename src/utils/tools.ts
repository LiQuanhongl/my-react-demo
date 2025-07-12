export const dateToString = (date: Date) => {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  month = Number(month) < 10 ? "0" + month : month;
  let day = String(date.getDate());
  day = Number(day) < 10 ? "0" + day : day;
  let h = String(date.getHours());
  h = Number(h) < 10 ? "0" + h : h;
  let m = String(date.getMinutes());
  m = Number(m) < 10 ? "0" + m : m;
  let s = String(date.getSeconds());
  s = Number(s) < 10 ? "0" + s : s;
  return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
};

// import { ip } from "../../vite.config";

export const ip = "http://192.168.1.109";

export const replaceIP = (str: string) =>
  str.replace(/http:\/\/localhost/g, ip);
