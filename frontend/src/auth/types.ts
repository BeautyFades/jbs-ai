import type { TowerId } from "@/towers/types";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  roles: string[];
  towers: TowerId[];
};
