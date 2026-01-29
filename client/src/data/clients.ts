export interface Client {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

export const clientsData: Client[] = [
  {
    id: "client-1",
    name: "Client 1",
    logo: "/assets/client-logo-1.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-2",
    name: "Client 2",
    logo: "/assets/client-logo-2.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-3",
    name: "Client 3",
    logo: "/assets/client-logo-3.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-4",
    name: "Client 4",
    logo: "/assets/client-logo-4.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-5",
    name: "Client 5",
    logo: "/assets/client-logo-5.png",
    description: "Graphic Design Client",
  },
  {
    id: "client-6",
    name: "Client 6",
    logo: "/assets/client-logo-6.png",
    description: "Graphic Design Client",
  },
];
