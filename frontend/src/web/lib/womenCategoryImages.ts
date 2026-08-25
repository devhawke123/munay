import womenHero from "../assets/women-subcategories/women-hero.png";
import pullovers from "../assets/women-subcategories/women-knitwear-pullovers.png";
import cardigans from "../assets/women-subcategories/women-knitwear-cardigans.png";
import coats from "../assets/women-subcategories/women-outerwear-coats.png";
import capes from "../assets/women-subcategories/women-outerwear-capes.png";
import scarfs from "../assets/women-subcategories/women-accessories-scarfs.png";
import snoodsHoods from "../assets/women-subcategories/women-accessories-snoods-hoods.png";
import headwears from "../assets/women-subcategories/women-accessories-headwears.png";
import glovesMittens from "../assets/women-subcategories/women-accessories-gloves-mittens.png";

export const WOMEN_HERO_IMAGE = womenHero;

/** Subcategory tile images on /category/women */
export const WOMEN_SUBCATEGORY_IMAGES: Record<string, string> = {
  Pullovers: pullovers,
  Cardigans: cardigans,
  Coats: coats,
  Capes: capes,
  Headwears: headwears,
  "Gloves & Mittens": glovesMittens,
  "Snoods & Hoods": snoodsHoods,
  "Shawls / Scarfs": scarfs,
};

export function getWomenTileImage(subcategory: string): string | undefined {
  return WOMEN_SUBCATEGORY_IMAGES[subcategory];
}
