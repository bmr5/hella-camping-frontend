import ClearLakeImage from "./Clear-Lake/Clear_Lake.jpeg";
import AnzaBorregoDesertImage from "./Anza-Borrego-Desert/Anza_Borrego_Desert.jpeg";
import MacKerricherImage from "./MacKerricher/MacKerricher.jpeg";
import AngelIslandImage from "./Angel-Island/angel_island.jpeg";
import SanClementeBeachImage from "./San-Clemente-Beach/San_Clemente_Beach.jpeg";
import SaltPointImage from "./Salt-Point/Salt_Point.jpeg";
import MountDiabloImage from "./Mount-Diablo/Mount_Diablo.jpeg";
import BigBasinRedwoods from "./Big-Basin-Redwoods/Big_Basin_Redwoods.jpeg";
import PrarieCreekRedwoodsImage from "./Prarie-Creek-Redwoods/Prarie_Creek_Redwoods.webp";
import { StaticImageData } from "next/image";

export const topParksList: Array<{
  id: number;
  parkName: string;
  src: StaticImageData | string;
}> = [
  { id: 13, parkName: "Angel Island State Park", src: AngelIslandImage },
  {
    id: 1,
    parkName: "Anza Borrego Desert State Park",
    src: AnzaBorregoDesertImage,
  },
  { id: 33, parkName: "Big Basin Redwoods State Park", src: BigBasinRedwoods },
  { id: 23, parkName: "San Clemente State Beach", src: SanClementeBeachImage },
  { id: 9, parkName: "MacKerricher State Park", src: MacKerricherImage },
  { id: 29, parkName: "Mount Diablo State Park", src: MountDiabloImage },
  { id: 25, parkName: "Salt Point State Park", src: SaltPointImage },
  {
    id: 49,
    parkName: "Prarie Creek Redwoods State Park",
    src: PrarieCreekRedwoodsImage,
  },
  { id: 5, parkName: "Clear Lake State Park", src: ClearLakeImage },
];
