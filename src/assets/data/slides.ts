interface TrendSlidesProps {
  title: string;
  img: string;
  imageWidth: number;
  imageHeight: number;
  active: boolean;
  centered?: boolean;
  type?: string;
  exclusive?: string;
  prix?: string;
  cross?: TrendCrossProps[];
}

interface TrendCrossProps {
  title: string;
  price: string;
}

export const trendCrossSlides: TrendSlidesProps[] = [
  {
    title: "Nike Air Max Plus",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669112/cross1_eywj2n.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    active: true,
    type: "Chaussure pour homme",
    // exclusive: "Exclusivité Membres",
    prix: "199.99 €",
    cross: [
      {
        title: "Haut en tissu Fleece pour homme",
        price: "99.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
  {
    title: "Nike Air Max Terrascape Plus",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669110/cross2_uprfqz.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    active: true,
    type: "Chaussure pour homme",
    prix: "199.99 €",
    cross: [
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
  {
    title: "Nike Air Force 1 Shadow",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669109/cross3_tog3ay.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour femme",
    prix: "129.99 €",
    cross: [
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
  {
    title: "Nike Air Force 1 '07",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669106/cross4_n0jg3n.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour homme",
    prix: "129.99 €",
    cross: [
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
  {
    title: "Nike Dunk Low",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669105/cross5_fzdpwr.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour femme",
    prix: "109.99 €",
    cross: [
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
  {
    title: "Nike Sportswear Club",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669103/cross6_oyfc9y.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Pantalon de jogging",
    prix: "24.99 €",
    cross: [
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
  {
    title: "Nike Air Max Plus Mercurial 25",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695669102/cross7_a6sssd.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour femme",
    prix: "199.99 €",
    cross: [
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
      {
        title: "Nike Air Max Plus",
        price: "199.99 €",
      },
    ],
  },
];

export const trendSlides: TrendSlidesProps[] = [
  {
    title: "Nike Air Max Plus",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695667318/Nike_Air_Max_Plus_1-min_benazh.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    active: true,
    type: "Chaussure pour homme",
    exclusive: "Exclusivité Membres",
    prix: "199.99 €",
  },
  {
    title: "Nike Air Max Terrascape Plus",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668040/nike-air-max-terrascape-plus_qz6ung.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    active: true,
    type: "Chaussure pour homme",
    prix: "199.99 €",
  },
  {
    title: "Nike Air Force 1 Shadow",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668043/nike-air-force-1-shadow_coejr3.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour femme",
    prix: "129.99 €",
  },
  {
    title: "Nike Air Force 1 '07",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668041/nike-air-force-107_ibs2ff.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour homme",
    exclusive: "Exclusivité Membres",
    prix: "129.99 €",
  },
  {
    title: "Nike Dunk Low",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668038/nike-dunk-low_jtynro.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour femme",
    prix: "109.99 €",
  },
  {
    title: "Nike Sportswear Club",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668034/Nike_Sportswear_Club_z9o1ms.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Pantalon de jogging",
    prix: "24.99 €",
  },
  {
    title: "Nike Air Max Plus Mercurial 25",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668044/nike-air-max-plus-mercurial-25_laaiub.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: true,
    type: "Chaussure pour femme",
    prix: "199.99 €",
  },
  {
    title: "Nike Sportswear Club Fleece",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668037/nike-sportswear-club-fleece_xe3lne.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: false,
    type: "Chaussure pour homme",
    prix: "54.99 €",
  },
  {
    title: "Nike Dunk Low",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668039/nike-dunk-low2_hi1n2q.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: false,
    type: "Chaussure pour homme",
    prix: "109.99 €",
  },
  {
    title: "Inter Milan 2022_23 Stadium Extérieur.png",
    img: "https://res.cloudinary.com/dgsc66scx/image/upload/v1695668045/ilan-2022-23-stadium-exte204129rieur_qjo0pa.webp",
    imageWidth: 465.117,
    imageHeight: 465.117,
    centered: true,
    active: false,
    type: "Chaussure pour homme",
    prix: "89.99 €",
  },
];
