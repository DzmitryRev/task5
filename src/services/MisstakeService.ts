import { faker } from "@faker-js/faker";
import { ITableData } from "../models/TableDataModel";

class MistakeService {
  /**
   * add new mistake handler to this array if you want define new
   * type of mistake
   */
  static availableMistakes: ((word: string) => string)[] = [
    this.switchSymbols,
    this.removeSymbol,
    this.addSymbol,
  ];

  /**
   * add new fields to this array if you want to make mistake at them
   */
  static userFields: (keyof ITableData)[] = ["fullname", "phone", "adress"];

  // random pick handler and fields
  static pickTypeOfMistake() {
    return faker.datatype.number({ min: 0, max: this.availableMistakes.length - 1 });
  }
  static pickUserField() {
    return faker.datatype.number({ min: 0, max: this.availableMistakes.length - 1 });
  }

  // mistake hadlers
  static switchSymbols(word: string) {
    if (!word) return word;

    let arrOfLetters = word.split("");
    let positionOne = faker.datatype.number({
      min: 0,
      max: arrOfLetters.length - 1,
    });
    let positionTwo = faker.datatype.number({
      min: 0,
      max: arrOfLetters.length - 1,
    });
    let first = arrOfLetters[positionOne];
    let second = arrOfLetters[positionTwo];
    arrOfLetters[positionTwo] = first;
    arrOfLetters[positionOne] = second;
    return arrOfLetters.join("");
  }
  static removeSymbol(word: string) {
    if (!word) return word;
    let arrOfLetters = word.split("");
    let random = faker.datatype.number({ min: 0, max: arrOfLetters.length - 1 });
    return arrOfLetters.filter((item, index) => index !== random).join("");
  }

  static addSymbol(word: string) {
    let arrOfLetters = word.split("");
    let random = word.length && faker.datatype.number({ min: 0, max: arrOfLetters.length - 1 });
    arrOfLetters.splice(
      random,
      0,
      String.fromCharCode(faker.datatype.number({ min: 48, max: 90 }))
    );
    return arrOfLetters.join("");
  }

  // "probabilistic error" handler

  static probabilisticError(probability: number) {
    const random = faker.datatype.float({ min: 0, max: 1 });
    return random <= probability ? true : false;
  }

  // output function

  static createMistakes(user: ITableData, numberOfErrors: number): ITableData {
    const userCopy = { ...user };
    let field = this.pickUserField();
    let mistake = this.pickTypeOfMistake();
    let floorNumberOfErrors = Math.floor(numberOfErrors);
    for (let i = 0; i < floorNumberOfErrors; i++) {
      userCopy[this.userFields[field]] = this.availableMistakes[mistake](
        `${userCopy[this.userFields[field]]}`
      );

      field = i % 3 === 0 ? (field === this.userFields.length - 1 ? 0 : field + 1) : field;
      mistake = mistake === this.availableMistakes.length - 1 ? 0 : mistake + 1;
    }
    if (this.probabilisticError(numberOfErrors - floorNumberOfErrors)) {
      userCopy[this.userFields[field]] = this.availableMistakes[mistake](
        `${userCopy[this.userFields[field]]}`
      );
    }
    return userCopy;
  }
}

export default MistakeService;
