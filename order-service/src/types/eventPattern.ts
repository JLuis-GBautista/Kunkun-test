type Items = {
  productName: string;
  price: number;
};

export type OrderCreatePayloadV1 = {
  id: string;
  items: Items[];
  folio: string;
};
