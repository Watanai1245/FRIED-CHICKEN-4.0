export default interface Chick {
  title: string;
  prices: number[];
  _id: number;
  __v: number;
  desc: string;
  createdAt: string;
  extraOptions: {
    _id: number;
    text: string;
    price: number;
  }[];
  img: string;
  updatedAt: string;
}
