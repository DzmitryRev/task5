import { faker } from "@faker-js/faker";
import { SupportedLocalesType } from "../const/locales";
import { ITableData } from "../models/TableDataModel";
import MistakeService from "./MisstakeService";

export function generateTableData(
  locale: SupportedLocalesType,
  page: number,
  seed: string,
  errors: number
) {
  faker.setLocale(locale);
  let currentSeed = +`${seed}${page}`;

  faker.seed(currentSeed);

  let loadedCount = page > 1 ? 10 : 20;
  let startedFromIndex = page > 1 ? page * 10 : 0;
  let result: ITableData[] = [];

  for (let i = 0; i < loadedCount; i++) {
    const field: ITableData = {
      serial: `${startedFromIndex + 1}`,
      id: faker.datatype.hexadecimal({ prefix: "", length: 10 }),
      fullname: faker.name.fullName(),
      adress: `${faker.address.city()}, ${faker.address.streetAddress()}`,
      phone: faker.phone.number(),
    };
    startedFromIndex += 1;
    result.push(MistakeService.createMistakes(field, errors));
    currentSeed += 1000;
    faker.seed(currentSeed);
  }

  return result;
}
