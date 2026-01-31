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
    logo: `${import.meta.env.BASE_URL}assets/cheers_logo.png`,
    description: "Graphic Design Client",
  },
  {
    id: "client-2",
    name: "Japan Money Express",
    logo: `${import.meta.env.BASE_URL}assets/JME-logo.jpg`,
    description: "Graphic Design Client",
  },
  {
    id: "client-3",
    name: "Innovative Solutions",
    logo: `${import.meta.env.BASE_URL}assets/innovative_logo.png`,
    description: "Graphic Design Client",
  },
  {
    id: "client-4",
    name: "Ansu Investment",
    logo: `${import.meta.env.BASE_URL}assets/ansu_logo.png`,
    description: "Graphic Design Client",
  },
];
