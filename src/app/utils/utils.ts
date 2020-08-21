import { Package } from '../Utils/Package';
export default class Utils {
  static packages: Package[] = [
    new Package('Monthly Silver', 500),
    new Package('Quaterly Silver', 1500),
    new Package('Half-Yearly Silver', 3000),
    new Package('Yearly Silver', 6000),
    new Package('Monthly Gold', 800),
    new Package('Quaterly Gold', 2400),
    new Package('Half-Yearly Gold', 4800),
    new Package('Yearly Gold', 8000),
  ];
  static getPackages(): Package[] {
    return Utils.packages;
  }
}
