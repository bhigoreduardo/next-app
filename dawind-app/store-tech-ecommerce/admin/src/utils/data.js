export const categories = [
  {
    _id: 1,
    name: "Iphone",
    properties: [
      { name: "weight", values: [128, 200] },
      { name: "height", values: [10, 11] },
      { name: "length", values: [5] },
      { name: "width", values: [1] },
    ],
  },
  {
    _id: 2,
    name: "Iphone XR",
    parent: { _id: 1, name: "Iphone" },
    properties: [
      { name: "color", values: ["silver", "black", "rose"] },
      { name: "storage", values: [64, 128] },
    ],
  },
  {
    _id: 3,
    name: "Iphone LXR",
    parent: { _id: 1, name: "Iphone" },
    properties: [
      { name: "color", values: ["silver", "black", "gold"] },
      { name: "storage", values: [64, 128] },
    ],
  },
  {
    _id: 4,
    name: "Macbook",
    properties: [
      { name: "weight", values: [1900, 2000] },
      { name: "height", values: [30, 31] },
      { name: "length", values: [25] },
      { name: "width", values: [25] },
    ],
  },
  {
    _id: 5,
    name: "Macbook Pro 14",
    parent: { _id: 4, name: "Macbook" },
    properties: [
      { name: "color", values: ["silver", "black", "gold"] },
      { name: "storage", values: [1024, 2048] },
      { name: "processor", values: ["i7", "i9"] },
    ],
  },
  {
    _id: 6,
    name: "Macbook Pro 15",
    parent: { _id: 4, name: "Macbook" },
    properties: [
      { name: "color", values: ["silver", "black"] },
      { name: "storage", values: [1024, 2048] },
      { name: "processor", values: ["i7", "i9"] },
    ],
  },
];

export const products = [
  {
    _id: 1,
    title: "Iphone XR Black 128Gb",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes",
    price: 1900,
    images: [],
    category: {
      _id: 2,
      name: "Iphone XR",
      properties: [
        { name: "color", values: ["silver", "black", "rose"] },
        { name: "storage", values: [64, 128] },
      ],
    },
    properties: { shipping: true },
    categoryProperties: { color: "silver", storage: 128 },
  },
  {
    _id: 2,
    title: "Iphone XR Silver 128Gb",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes",
    price: 1900,
    images: [],
    category: {
      _id: 2,
      name: "Iphone XR",
      properties: [
        { name: "color", values: ["silver", "black", "rose"] },
        { name: "storage", values: [64, 128] },
      ],
    },
    properties: { shipping: true },
    categoryProperties: { color: "silver", storage: 128 },
  },
  {
    _id: 3,
    title: "Macbook Pro 14 XR Black 2048Gb",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes",
    price: 3900,
    images: [],
    category: {
      _id: 5,
      name: "Macbook Pro 14",
      properties: [
        { name: "color", values: ["silver", "black", "gold"] },
        { name: "storage", values: [1024, 2048] },
        { name: "processor", values: ["i7", "i9"] },
      ],
    },
    properties: { shipping: true },
    categoryProperties: { color: "silver", storage: 2048, processor: "i7" },
  },
];

export const orders = [
  {
    _id: 1,
    name: "John Doe",
    email: "johndoe@email.com",
    city: "City Doe",
    postalCode: "12346597",
    streetAddress: "Street Doe",
    country: "US",
    paid: true,
    line_items: [
      {
        _id: 1,
        title: "Iphone XR Black 128Gb",
        price: 1900,
        properties: { shipping: true },
        categoryProperties: { color: "silver", storage: 128 },
        quantity: 10,
      },
    ],
    createdAt: "2023-06-06T17:22:14.405Z",
  },
  {
    _id: 2,
    name: "John Doe",
    email: "johndoe@email.com",
    city: "City Doe",
    postalCode: "12346597",
    streetAddress: "Street Doe",
    country: "US",
    paid: true,
    line_items: [
      {
        _id: 1,
        title: "Iphone XR Black 128Gb",
        price: 1900,
        properties: { shipping: true },
        categoryProperties: { color: "silver", storage: 128 },
        quantity: 10,
      },
    ],
    createdAt: "2023-06-06T17:22:14.405Z",
  },
  {
    _id: 3,
    name: "John Doe",
    email: "johndoe@email.com",
    city: "City Doe",
    postalCode: "12346597",
    streetAddress: "Street Doe",
    country: "US",
    paid: true,
    line_items: [
      {
        _id: 1,
        title: "Iphone XR Black 128Gb",
        price: 1900,
        properties: { shipping: true },
        categoryProperties: { color: "silver", storage: 128 },
        quantity: 10,
      },
    ],
    createdAt: "2023-06-06T17:22:14.405Z",
  },
];
