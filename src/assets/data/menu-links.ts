import React from "react";

interface Link {
  name: string;
  submenu: boolean;
  sublinks?: SubLink[];
}

interface SubLink {
  Head: string;
  sublink: ItemLink[];
}

interface ItemLink {
  name: string;
  link: string;
}

export const menuLinks = [
  {
    name: "Products",
    submenu: true,
    sublinks: [
      {
        Head: "Products",
        sublink: [
          { name: "See all products", link: "/products" },
          { name: "See all products for men", link: "/products" },
          { name: "See all products for women", link: "/products" },
        ],
      },
    ],
  },
  {
    name: "Dashboard",
    submenu: true,
    sublinks: [
      {
        Head: "Admin Panel",
        sublink: [
          { name: "See all products", link: "/admin/products" },
          { name: "See all products for men", link: "/admin/products" },
          { name: "See all products for women", link: "/admin/products" },
        ],
      },
    ],
  },
  // {
  //   name: "Nouveautés du moment",
  //   // name: "Nouveautés et articles du moment",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "En ce moment",
  //       sublink: [
  //         { name: "Voir toutes les nouveautés", link: "/" },
  //         { name: "Nouveautés chaussures", link: "/" },
  //         { name: "Nouveautés vêtements", link: "/" },
  //         { name: "Prochaines sorties SNKRS", link: "/" },
  //         { name: "Boutique réservée aux membres", link: "/" },
  //         { name: "Meilleures ventes", link: "/" },
  //         { name: "", link: "/" },
  //         { name: "", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Voir les icônes",
  //       sublink: [
  //         { name: "Air Force 1", link: "/" },
  //         { name: "Air Jordan 1", link: "/" },
  //         { name: "Air Max", link: "/" },
  //         { name: "Dunk", link: "/" },
  //         { name: "Blazer", link: "/" },
  //         { name: "Pegasus", link: "/" },
  //         { name: "Mercurial", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Meilleures lectures",
  //       sublink: [
  //         { name: ".Swoosh", link: "/" },
  //         { name: "Collection Jordan", link: "/" },
  //         { name: "Nike SB - The Vault", link: "/" },
  //         { name: "Développement durable", link: "/" },
  //         { name: "Actualités Nike", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "Guides",
  //       sublink: [
  //         { name: "Tous les guides d'achat", link: "/" },
  //         { name: "Nike Running Shoe Finder", link: "/" },
  //         { name: "Guide des tailles de brassières", link: "/" },
  //         { name: "Nike Activity Finder", link: "/" },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   name: "Homme",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "Articles du moment",
  //       sublink: [
  //         { name: "Nouveautés", link: "/" },
  //         { name: "Prochaines sorties SNKRS", link: "/" },
  //         { name: "Les essentiels de l'été", link: "/" },
  //         { name: "Meilleures ventes", link: "/" },
  //         { name: "", link: "/" },
  //         { name: "", link: "/" },
  //         { name: "", link: "/" },
  //         { name: "", link: "/" },
  //         { name: "", link: "/" },
  //         { name: "", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Chaussures",
  //       sublink: [
  //         { name: "Toutes les chaussures", link: "/" },
  //         { name: "Lifestyle", link: "/" },
  //         { name: "Jordan", link: "/" },
  //         { name: "Running", link: "/" },
  //         { name: "Football", link: "/" },
  //         { name: "Basketball", link: "/" },
  //         { name: "Training et fitness", link: "/" },
  //         { name: "Skateboard", link: "/" },
  //         { name: "Nike By You", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Vêtements",
  //       sublink: [
  //         { name: "Tous les vêtements", link: "/" },
  //         { name: "Hauts et t-shirts", link: "/" },
  //         { name: "Sweats à capuche et sweats", link: "/" },
  //         { name: "Shorts", link: "/" },
  //         { name: "Pantalons et leggings", link: "/" },
  //         { name: "Survêtements", link: "/" },
  //         { name: "Vestes", link: "/" },
  //         { name: "Tenues et maillots d'équipe", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "Rechercher par sport",
  //       sublink: [
  //         { name: "Tous les sports", link: "/" },
  //         { name: "Running", link: "/" },
  //         { name: "Football", link: "/" },
  //         { name: "Basketball", link: "/" },
  //         { name: "Training et fitness", link: "/" },
  //         { name: "Tennis", link: "/" },
  //         { name: "Golf", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Accessoires et équipement",
  //       sublink: [
  //         { name: "Tous les accessoires et l'équipement", link: "/" },
  //         { name: "Sacs et sacs à dos", link: "/" },
  //         { name: "Chaussettes", link: "/" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "Femme",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "Articles du moment",
  //       sublink: [
  //         { name: "Nouveautés", link: "/" },
  //         { name: "Prochaines sorties SNKRS", link: "/" },
  //         { name: "Les essentiels de l'été", link: "/" },
  //         { name: "Meilleures ventes", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Chaussures",
  //       sublink: [
  //         { name: "Toutes les chaussures", link: "/" },
  //         { name: "Lifestyle", link: "/" },
  //         { name: "Jordan", link: "/" },
  //         { name: "Running", link: "/" },
  //         { name: "Training et fitness", link: "/" },
  //         { name: "Nike By You", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Vêtements",
  //       sublink: [
  //         { name: "Tous les vêtements", link: "/" },
  //         { name: "Hauts et t-shirts", link: "/" },
  //         { name: "Sweats à capuche et sweats", link: "/" },
  //         { name: "Leggings", link: "/" },
  //         { name: "Shorts", link: "/" },
  //         { name: "Pantalons", link: "/" },
  //         { name: "Ensembles", link: "/" },
  //         { name: "Vestes", link: "/" },
  //         { name: "Brassières de sport", link: "/" },
  //         { name: "Jupes et robes", link: "/" },
  //         { name: "Maillots de bain", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "Rechercher par sport",
  //       sublink: [
  //         { name: "Tous les sports", link: "/" },
  //         { name: "Running", link: "/" },
  //         { name: "Training et fitness", link: "/" },
  //         { name: "Tennis", link: "/" },
  //         { name: "Football", link: "/" },
  //         { name: "Yoga", link: "/" },
  //         { name: "Danse", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Accessoires et équipement",
  //       sublink: [
  //         { name: "Tous les accessoires et l'équipement", link: "/" },
  //         { name: "Sacs et sacs à dos", link: "/" },
  //         { name: "Chaussettes", link: "/" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "Enfant",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "Articles du moment",
  //       sublink: [
  //         { name: "Nouveautés", link: "/" },
  //         { name: "Les essentiels de l'été", link: "/" },
  //         { name: "Meilleures ventes", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Chaussures",
  //       sublink: [
  //         { name: "Toutes les chaussures", link: "/" },
  //         { name: "Lifestyle", link: "/" },
  //         { name: "Jordan", link: "/" },
  //         { name: "Football", link: "/" },
  //         { name: "Running", link: "/" },
  //         { name: "Basketball", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Vêtements",
  //       sublink: [
  //         { name: "Tous les vêtements", link: "/" },
  //         { name: "Hauts et t-shirts", link: "/" },
  //         { name: "Sweats à capuche et sweats", link: "/" },
  //         { name: "Survêtements", link: "/" },
  //         { name: "Shorts", link: "/" },
  //         { name: "Vêtements de sport", link: "/" },
  //         { name: "Pantalons et leggings", link: "/" },
  //         { name: "Vestes", link: "/" },
  //         { name: "Tenues et maillots d'équipe", link: "/" },
  //         { name: "Brassières de sport", link: "/" },
  //         { name: "Jupes et robes", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "Pour enfant par âge",
  //       sublink: [
  //         { name: "Ado (7-15 ans)", link: "/" },
  //         { name: "Enfant (3-7 ans)", link: "/" },
  //         { name: "Bébé et tout-petit (0-3 ans)", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Accessoires et équipement",
  //       sublink: [
  //         { name: "Tous les accessoires et l'équipement", link: "/" },
  //         { name: "Sacs et sacs à dos", link: "/" },
  //         { name: "Bonnets et casquettes", link: "/" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "Promotions",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "Offres et réductions",
  //       sublink: [
  //         { name: "Voir toutes les promotions", link: "/" },
  //         { name: "Meilleures ventes", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Promotions pour homme",
  //       sublink: [
  //         { name: "Voir tous les articles pour homme en promotion", link: "/" },
  //         { name: "Chaussures", link: "/" },
  //         { name: "Vêtements", link: "/" },
  //         { name: "Accessoires et équipement", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Promotions pour femme",
  //       sublink: [
  //         { name: "Voir tous les articles pour femme en promotion", link: "/" },
  //         { name: "Chaussures", link: "/" },
  //         { name: "Vêtements", link: "/" },
  //         { name: "Accessoires et équipement", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "Promotions pour enfant",
  //       sublink: [
  //         {
  //           name: "Voir tous les articles pour enfant en promotion",
  //           link: "/",
  //         },
  //         { name: "Chaussures", link: "/" },
  //         { name: "Vêtements", link: "/" },
  //         { name: "Accessoires et équipement", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Offres",
  //       // Head: "Promotions par sport",
  //       sublink: [
  //         { name: "Running", link: "/" },
  //         { name: "Football", link: "/" },
  //         { name: "Fitness et training", link: "/" },
  //         { name: "Basketball", link: "/" },
  //         { name: "Tennis", link: "/" },
  //         { name: "Golf", link: "/" },
  //         { name: "Yoga", link: "/" },
  //       ],
  //     },
  //   ],
  // },
];
