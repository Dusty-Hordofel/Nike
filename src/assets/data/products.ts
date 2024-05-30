type Product = {
  name: string;
  url: string;
};

type Category = {
  name: string;
  products: Product[];
};

type ECommerceSite = Category[];

export const categories: ECommerceSite = [
  {
    name: "Chaussures",
    products: [
      {
        name: "Chaussures de golf",
        url: "https://www.nike.com/fr/w/golf-chaussures-23q9wzy7ok",
      },
      {
        name: "Chaussures d'hiver",
        url: "https://www.nike.com/fr/w/temps-froid-chaussures-7t42qzy7ok",
      },
      {
        name: "Chaussures en GORE-TEX",
        url: "https://www.nike.com/fr/w/gore-tex-chaussures-2o5ryzy7ok",
      },
      {
        name: "Chaussures de marche",
        url: "https://www.nike.com/fr/w/marche-a-pied-chaussures-b3e0kzy7ok",
      },
      {
        name: "Air Max 90 blanches",
        url: "https://www.nike.com/fr/w/blanc-air-max-90-chaussures-4g797zauqmozy7ok",
      },
      {
        name: "Chaussures d'haltérophilie",
        url: "https://www.nike.com/fr/w/lever-de-charges-chaussures-8d90qzy7ok",
      },
      {
        name: "Sandals & Slides",
        url: "https://www.nike.com/fr/w/sandales-claquettes-fl76",
      },
      {
        name: "Black Running Shoes",
        url: "https://www.nike.com/fr/w/noir-running-chaussures-37v7jz90poyzy7ok",
      },
      {
        name: "White Running Shoes",
        url: "https://www.nike.com/fr/w/blanc-running-chaussures-37v7jz4g797zy7ok",
      },
      {
        name: "Trail Running Shoes",
        url: "https://www.nike.com/fr/w/chemin-running-chaussures-37v7jz7sboyzy7ok",
      },
      {
        name: "Running Shoes Sale",
        url: "https://www.nike.com/fr/w/promotions-running-chaussures-37v7jz3yaepzy7ok",
      },
    ],
  },
  {
    name: "Vêtements",
    products: [
      {
        name: "Tous les vêtements",
        url: "https://www.nike.com/fr/w/vetements-6ymx6",
      },
      {
        name: "Pantalons de yoga",
        url: "https://www.nike.com/fr/w/yoga-pantalons-et-collants-2kq19zanrlj",
      },
      {
        name: "Pantalons de survêtement Tech Fleece",
        url: "https://www.nike.com/fr/w/tech-fleece-pantalons-survetement-joggers-6sipkzaepf0",
      },
      {
        name: "Pantalons Tech Fleece",
        url: "https://www.nike.com/fr/w/tech-fleece-pantalons-et-collants-2kq19z6sipk",
      },
      {
        name: "Sweat à capuche Tech Fleece",
        url: "https://www.nike.com/fr/w/tech-fleece-sweats-a-capuche-et-sweat-shirts-6rivez6sipk",
      },
      {
        name: "Survêtements de football",
        url: "https://www.nike.com/fr/w/football-survetements-sport-1gdj0z1ll2w",
      },
      {
        name: "Tech Fleece",
        url: "https://www.nike.com/fr/w/tech-fleece-vetements-6sipkz6ymx6",
      },
      {
        name: "Plus Size",
        url: "https://www.nike.com/fr/w/femmes-grande-taille-5e1x6z8mjm2",
      },
    ],
  },
  {
    name: "Enfant",
    products: [
      {
        name: "Claquettes pour enfant",
        url: "https://www.nike.com/fr/w/kids-sandales-claquettes-fl76zv4dh",
      },
      {
        name: "Survêtements pour enfant en promotion",
        url: "https://www.nike.com/fr/w/kids-promotions-survetements-sport-1ll2wz3yaepzv4dh",
      },
      {
        name: "Doudoune pour enfant",
        url: "https://www.nike.com/fr/w/kids-vestes-courtes-4m0oyzv4dh",
      },
    ],
  },
  {
    name: "Articles du moment",
    products: [
      {
        name: "Clubs de football",
        url: "https://www.nike.com/fr/w/clubs-de-football-nationaux-6fu9q",
      },
      { name: "Football", url: "https://www.nike.com/fr/w/football-1gdj0" },
      { name: "Nike Run Club", url: "https://www.nike.com/fr/nrc-app" },
      { name: "Nike Training Club", url: "https://www.nike.com/fr/ntc-app" },
      {
        name: "Factory Store",
        url: "https://www.nike.com/gb/nike-factory-store",
      },
      {
        name: "Black Trainers",
        url: "https://www.nike.com/fr/w/noir-chaussures-90poyzy7ok",
      },
      {
        name: "Chaussures de foot blanches",
        url: "https://www.nike.com/fr/w/blanc-football-chaussures-1gdj0z4g797zy7ok",
      },
      {
        name: "Chaussures de foot bleues",
        url: "https://www.nike.com/fr/w/bleu-football-chaussures-1gdj0z8hfx3zy7ok",
      },
      { name: "Cadeaux", url: "https://www.nike.com/fr/w/cadeaux-3b0uf" },
      {
        name: "Cadeaux pour enfant",
        url: "https://www.nike.com/fr/w/kids-cadeaux-3b0ufzv4dh",
      },
      {
        name: "Cadeaux de football",
        url: "https://www.nike.com/fr/w/cadeaux-football-1gdj0z3b0uf",
      },
      {
        name: "Cadeaux de yoga",
        url: "https://www.nike.com/fr/w/cadeaux-yoga-3b0ufzanrlj",
      },
      {
        name: "Cadeaux de fitness",
        url: "https://www.nike.com/fr/w/cadeaux-training-3b0ufz58jto",
      },
      {
        name: "England Football Kits 2024",
        url: "https://www.nike.com/fr/w/football-angleterre-1gdj0z8p57d",
      },
      { name: "France Football Kits 2024", url: "https://www.nike" },
      { name: "Netherlands Football Kits 2024", url: "https://www.nike" },
      { name: "Portugal Football Kits 2024", url: "https://www.nike" },
    ],
  },
];
