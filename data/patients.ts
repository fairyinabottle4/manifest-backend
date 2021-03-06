import { Patient, TravelClass, FrequentFlyer } from "../src/types";

const patients: Patient[] = [
    {
      id: 'd2773336-f723-11e9-8f0b-362b9e155667',
      name: 'Jonas Kahnwald',
      dateOfBirth: '1986-07-09',
      confirmNumber: 'A9BU9D',
      rating: 5,
      frequentFlyer: FrequentFlyer.Gold,
      travelClass: TravelClass.First,
      seatNumber: "1A",
      dietaryRequirements: "",
      entries: [
        {
          id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
          date: '2015-01-02',
          route: 'SIN-LAX',
          travelClass: TravelClass.First,
        },
      ],
    },
    {
      id: 'd2773598-f723-11e9-8f0b-362b9e155667',
      name: 'Martha Nielsen',
      dateOfBirth: '1979-01-30',
      confirmNumber: 'HJ9A0F',
      rating: 4,
      travelClass: TravelClass.Business,
      seatNumber: "23D",
      dietaryRequirements: "SFML",
      entries: [
        {
          id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
          date: '2019-08-05',
          route: 'SIN-SFO',
          travelClass: TravelClass.Business
        },
      ],
    },
    {
      id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
      name: 'Jake Peralta',
      dateOfBirth: '1970-04-25',
      confirmNumber: 'WT7Y98',
      rating: 3,
      travelClass: TravelClass.PremiumEconomy,
      seatNumber: "31D",
      dietaryRequirements: "NFMLA",
      entries: [],
    },
    {
      id: 'd2773822-f723-11e9-8f0b-362b9e155667',
      name: 'Lee Ik-Jun',
      dateOfBirth: '1974-01-05',
      confirmNumber: 'N03R54',
      frequentFlyer: FrequentFlyer.Silver,
      rating: 3,
      travelClass: TravelClass.Economy,
      seatNumber: "55H",
      dietaryRequirements: "LFML",
      entries: [
        {
          id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
          date: '2019-10-20',
          route: 'SIN-SYD',
          travelClass: TravelClass.Economy,
        },
        {
          id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
          date: '2019-09-10',
          route: 'SYD-SIN',
          travelClass: TravelClass.Economy,
        },
        {
          id: '37be178f-a432-4ba4-aac2-f86810e36a15',
          date: '2018-10-05',
          route: 'SIN-BKK',
          travelClass: TravelClass.Economy
        },
      ],
    },
    {
      id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
      name: 'Wong Pei Chee',
      dateOfBirth: '1971-04-09',
      confirmNumber: 'DH89AE',
      rating: 4,
      travelClass: TravelClass.Economy,
      seatNumber: "55K",
      dietaryRequirements: "BBML",
      entries: [
        {
          id: '54a8746e-34c4-4cf4-bf72-bfecd039be9a',
          date: '2019-05-01',
          route: 'SIN-HKG',
          travelClass: TravelClass.Economy,
        },
      ],
    },
  ];
  
  export default patients;
  