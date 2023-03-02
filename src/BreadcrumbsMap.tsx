export type BreadcrumbType = {
  nome: string
  path: string
};

let homePage: BreadcrumbType =
{
  nome: "Homepage",
  path: "/"
}

let impostazioni: BreadcrumbType =
{
  nome: "Impostazioni Utente",
  path: "/impostazioni"
}

let visualizzaLog: BreadcrumbType =
{
  nome: "Visualizza log",
  path: "/logs"
}

let visualizzaLogError: BreadcrumbType =
{
  nome: "Livello Error",
  path: "/logs/error"
}

let visualizzaLogWarn: BreadcrumbType =
{
  nome: "Livello Warn",
  path: "/logs/warn"
}

let visualizzaLogInfo: BreadcrumbType =
{
  nome: "Livello Info",
  path: "/logs/info"
}

let visualizzaLogDebug: BreadcrumbType =
{
  nome: "Livello Debug",
  path: "/logs/debug"
}

let listaVociDiMenu: BreadcrumbType =
{
  nome: "Lista voci di menu",
  path: "/lista-menu"
}

export default function BreadcrumbsMap(pathName: any) {
  let array: BreadcrumbType[] = [];
  array.push(homePage);

  if ("/impostazioni" === pathName) {
    array.push(impostazioni);
  }

  if("/logs/error" === pathName){
    array.push(visualizzaLog);
    array.push(visualizzaLogError)
  }

  if("/logs/warn" === pathName){
    array.push(visualizzaLog);
    array.push(visualizzaLogWarn)
  }

  if("/logs/info" === pathName){
    array.push(visualizzaLog);
    array.push(visualizzaLogInfo)
  }

  if("/logs/debug" === pathName){
    array.push(visualizzaLog);
    array.push(visualizzaLogDebug)
  }

  if("/logs" === pathName){
    array.push(visualizzaLog);
  }

  if("/lista-menu" === pathName){
    array.push(listaVociDiMenu);
  }

  return array;
}