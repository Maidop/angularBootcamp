export function dateStringToDateJs(data: string): Date {
  const novaData = data.split('/');
  // tslint:disable-next-line:radix
  const ano = parseInt(novaData[2]);
  // tslint:disable-next-line:radix
  const mes = parseInt(novaData[1]) - 1;
  // tslint:disable-next-line:radix
  const dia = parseInt(novaData[0]);
  return new Date(ano, mes, dia);
}
