export default class ProductModel {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  description: string;
  image: string;

  constructor(
    id: number,
    name: string,
    category: string,
    price: string,
    rating: number,
    description: string,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.description = description;
    this.image = image;
  }
}