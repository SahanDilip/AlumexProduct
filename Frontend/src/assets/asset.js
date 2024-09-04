const alloys = [6063, 6005, 6082];

const graphs = {Bta : 10,Grain_Size : 20,Inverse_Segregarian : 30}

const dataforbta = {
  labels: [
    "24E0049A",
    "24E0050A",
    "24F0083A",
    "24F0058J",
    "24F0061J",
    "24E0010K",
    "24G0092K",
    "24A0340K",
    "24F0074H",
    "24H0126A",
    "24H0124J",
    "24A0327",
    "24H0191A",
    "24G0096A",
    "24G0100J",
  ],
  datasets: [
    {
      label: "BTA - 6",
      data: [94, 96, 93, 91, 90, 88, 95, 92, 89, 87, 85, 93, 94, 96, 97],
      borderColor: "blue",
      fill: false,
    },
    {
        label: "BTA - 6",
        data: [90, 86, 97, 71, 80, 98, 91, 92, 85, 89, 85, 94, 94, 96, 97],
        borderColor: "red",
        fill: false,
    }
  ],
};

export { alloys, dataforbta,graphs };