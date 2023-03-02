export default function PageTitleMap(pathName: any) {
  console.info(pathName);

  if ("/" === pathName) {
    return "Homepage"
  } else if ("/impostazioni" === pathName) {
    return "Impostazioni utente"
  } else if ("/logs/error" === pathName) {
    return "Log livello error"
  } else if ("/logs/warn" === pathName) {
    return "Log livello warn"
  } else if ("/logs/info" === pathName) {
    return "Log livello info"
  } else if ("/logs/debug" === pathName) {
    return "Log livello debug"
  } else if ("/logs" === pathName) {
    return "Log"
  } else if ("/lista-menu" === pathName) {
    return "Lista voci di menu"
  } else {
    return "";
  }
}