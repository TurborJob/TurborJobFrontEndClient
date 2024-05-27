export const pocketsExtend = [
  {
    id: 1,
    numDayExtend: 1,
    time: "day",
    limitJobInDay: 5,
    limitWorkerInDay: 10,
    price: { TBV: 50 , VND: 50000},
  },
  {
    id: 2,
    numDayExtend: 30,
    time: "month",
    limitJobInDay: 5,
    limitWorkerInDay: 15,
    price: { TBV: 200 ,VND: 200000},
  },
  {
    id: 3,
    numDayExtend: 365,
    time: "year",
    limitJobInDay: 10,
    limitWorkerInDay: 20,
    price: { TBV: 500, VND: 500000 },
  },
];

export const paymentMethods = [
  {
    id: 1,
    code: "metamask",
    name: "Meta Mask",
    status: 1,
    logo: "/image/meta_mask.png",
    currency: "TBV",
  },
  {
    id: 2,
    code: "vnpay",
    name: "VN pay",
    status: 1,
    logo: "/image/vnpay.png",
    currency: "VND",
  },
];
