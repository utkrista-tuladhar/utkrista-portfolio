export interface Client {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

export const clientsData: Client[] = [
  {
    id: "client-1",
    name: "Cheers Online Liquor Store",
    logo: "/assets/cheers_logo.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-2",
    name: "Japan Money Express",
    logo: "/assets/JME-logo.jpg",
    description: "Graphic Design Client",
  },
  {
    id: "client-3",
    name: "Innovative Solutions",
    logo: "/assets/innovative_logo.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-4",
    name: "Ansu Investment",
    logo: "/assets/ansu_logo.png",
    description: "Graphic Design Client",
  },
];
