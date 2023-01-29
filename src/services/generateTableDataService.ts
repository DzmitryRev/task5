import { faker } from "@faker-js/faker";
import { SupportedLocalesType } from "../const/locales";
import { ITableData } from "../models/TableDataModel";

export function generateTableData(locale: SupportedLocalesType) {
  faker.setLocale(locale);
  faker.seed(1);
  let result: ITableData[] = [];

  for (let i = 0; i < 20; i++) {
    const field: ITableData = {
      serial: i + 1,
      id: faker.datatype.hexadecimal({ prefix: "", length: 10 }),
      fullname: faker.name.fullName(),
      adress: `${faker.address.city()}, ${faker.address.streetAddress()}`,
      phone: faker.phone.number(),
    };
    result.push(field);
  }
  return result;
}
