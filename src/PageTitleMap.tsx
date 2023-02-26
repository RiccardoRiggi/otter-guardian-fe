export default function PageTitleMap(pathName: any) {
  console.info(pathName);

  if ("/" === pathName) {
    return "Homepage"
  } else if ("/impostazioni"===pathName) { 
    return "Impostazioni utente"
  } else {
    return "";
  }
}