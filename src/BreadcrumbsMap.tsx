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

export default function BreadcrumbsMap(pathName: any) {
  let array: BreadcrumbType[] = [];
  array.push(homePage);

  if ("/impostazioni" === pathName) {
    array.push(impostazioni);
  }

  return array;
}